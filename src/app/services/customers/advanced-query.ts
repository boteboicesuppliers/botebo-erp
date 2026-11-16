import { Injectable, signal } from '@angular/core';
import { CustomerModel, CUSTOMER_STATUSES } from '../../models/contracts/customer-model';

export type FieldType = 'text' | 'number' | 'enum';
export type Combinator = 'AND' | 'OR';
export type QueryOperator =
  | 'contains' | 'notContains' | 'equals' | 'notEquals' | 'startsWith'
  | 'gt' | 'gte' | 'lt' | 'lte' | 'between'
  | 'isEmpty' | 'isNotEmpty';

export interface QueryCondition {
  id: string;
  field: string;
  operator: QueryOperator;
  value: string;
  value2: string;
}

export interface QueryGroup {
  id: string;
  combinator: Combinator;
  conditions: QueryCondition[];
  groups: QueryGroup[];
}

export interface QueryFieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
}

export interface SavedQuery {
  id: string;
  name: string;
  query: QueryGroup;
}

// What the form hands back when the user clicks "Run query"
export interface QueryRun {
  query: QueryGroup;
  savedId: string | null;
}

type NumberFn = (c: CustomerModel) => string;

const STORAGE_KEY = 'botebo-erp.customer-saved-queries';

const toOptions = (values: string[]) => values.map((v) => ({ value: v, label: v }));

const SYMBOL: Record<QueryOperator, string> = {
  contains: 'contains', notContains: 'does not contain', equals: '=', notEquals: '≠',
  startsWith: 'starts with', gt: '>', gte: '≥', lt: '<', lte: '≤', between: 'between',
  isEmpty: 'is empty', isNotEmpty: 'is not empty',
};

@Injectable({ providedIn: 'root' })
export class AdvancedQuery {
  readonly fields: QueryFieldDef[] = [
    { key: 'customerNumber', label: 'Customer Number', type: 'text' },
    { key: 'businessName', label: 'Business Name', type: 'text' },
    { key: 'status', label: 'Status', type: 'enum', options: toOptions(CUSTOMER_STATUSES) },
    { key: 'customerType', label: 'Customer Type', type: 'enum', options: toOptions(['Reseller', 'Retail/Forecourt', 'Food & Beverage']) },
    { key: 'city', label: 'City', type: 'text' },
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'businessEmail', label: 'Business Email', type: 'text' },
    { key: 'businessPhone', label: 'Business Phone', type: 'text' },
    { key: 'contactFirstName', label: 'First Name', type: 'text' },
    { key: 'contactLastName', label: 'Last Name', type: 'text' },
    { key: 'contactEmail', label: 'Email', type: 'text' },
    { key: 'contactPhone', label: 'Phone', type: 'text' },
    {
      key: 'vatRegistered', label: 'VAT Status', type: 'enum',
      options: [{ value: 'true', label: 'VAT registered' }, { value: 'false', label: 'Not VAT registered' }],
    },
    { key: 'vatNumber', label: 'VAT Number', type: 'text' },
    { key: 'creditLimit', label: 'Credit Limit', type: 'number' },
    { key: 'paymentTerm', label: 'Payment Term', type: 'enum', options: toOptions(['Cash on Delivery', 'Custom Term']) },
    { key: 'paymentDays', label: 'Payment Days', type: 'number' },
  ];

  readonly operators: Record<FieldType, { value: QueryOperator; label: string }[]> = {
    text: [
      { value: 'contains', label: 'contains' },
      { value: 'notContains', label: 'does not contain' },
      { value: 'equals', label: 'equals' },
      { value: 'notEquals', label: 'does not equal' },
      { value: 'startsWith', label: 'starts with' },
      { value: 'isEmpty', label: 'is empty' },
      { value: 'isNotEmpty', label: 'is not empty' },
    ],
    number: [
      { value: 'equals', label: '=' },
      { value: 'notEquals', label: '≠' },
      { value: 'gt', label: '>' },
      { value: 'gte', label: '≥' },
      { value: 'lt', label: '<' },
      { value: 'lte', label: '≤' },
      { value: 'between', label: 'between' },
      { value: 'isEmpty', label: 'is empty' },
      { value: 'isNotEmpty', label: 'is not empty' },
    ],
    enum: [
      { value: 'equals', label: 'is' },
      { value: 'notEquals', label: 'is not' },
    ],
  };

  // SAVED QUERIES (persisted in localStorage)
  readonly savedQueries = signal<SavedQuery[]>(this.loadSaved());

  private idCounter = 0;

  private uid(): string {
    return `q${Date.now().toString(36)}${(this.idCounter++).toString(36)}`;
  }

  // SAVED QUERIES: ACTIONS

  // Saving under an existing name (case-insensitive) overwrites that query
  saveQuery(name: string, query: QueryGroup): SavedQuery {
    const trimmed = name.trim();
    const existing = this.savedQueries().find((s) => s.name.toLowerCase() === trimmed.toLowerCase());
    const entry: SavedQuery = {
      id: existing?.id ?? this.uid(),
      name: trimmed,
      query: structuredClone(query),
    };

    this.savedQueries.update((list) =>
      existing ? list.map((s) => (s.id === existing.id ? entry : s)) : [...list, entry],
    );
    this.persistSaved();

    return entry;
  }

  deleteSaved(id: string): void {
    this.savedQueries.update((list) => list.filter((s) => s.id !== id));
    this.persistSaved();
  }

  private loadSaved(): SavedQuery[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];

      return Array.isArray(parsed) ? (parsed as SavedQuery[]) : [];
    } catch {
      return [];
    }
  }

  private persistSaved(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.savedQueries()));
    } catch {
      // Storage unavailable or full: queries still work for this session
    }
  }

  // BUILDERS

  createGroup(): QueryGroup {
    return { id: this.uid(), combinator: 'AND', conditions: [], groups: [] };
  }

  createCondition(): QueryCondition {
    return { id: this.uid(), field: 'businessName', operator: 'contains', value: '', value2: '' };
  }

  fieldDef(key: string): QueryFieldDef {
    return this.fields.find((f) => f.key === key) ?? this.fields[0];
  }

  operatorsFor(fieldKey: string) {
    return this.operators[this.fieldDef(fieldKey).type];
  }

  needsValue(op: QueryOperator): boolean {
    return op !== 'isEmpty' && op !== 'isNotEmpty';
  }

  isConditionComplete(c: QueryCondition): boolean {
    if (!this.needsValue(c.operator)) return true;
    if (!c.value.trim()) return false;
    if (c.operator === 'between' && !c.value2.trim()) return false;

    return true;
  }

  countActive(g: QueryGroup): number {
    return (
      g.conditions.filter((c) => this.isConditionComplete(c)).length +
      g.groups.reduce((n, s) => n + this.countActive(s), 0)
    );
  }

  // EVALUATION

  private getFieldValue(c: CustomerModel, key: string, customerNumber: NumberFn): unknown {
    switch (key) {
      case 'customerNumber': return customerNumber(c);
      case 'city': return c.address.split(',').pop()?.trim() ?? '';
      case 'vatRegistered': return String(c.vatRegistered);
      case 'status': return c.status ?? 'Onboarding';
      default: return (c as unknown as Record<string, unknown>)[key];
    }
  }

  evaluateCondition(cond: QueryCondition, customer: CustomerModel, customerNumber: NumberFn): boolean {
    const def = this.fieldDef(cond.field);
    const raw = this.getFieldValue(customer, cond.field, customerNumber);
    const empty = raw === null || raw === undefined || String(raw).trim() === '';

    if (cond.operator === 'isEmpty') return empty;
    if (cond.operator === 'isNotEmpty') return !empty;

    if (def.type === 'number') {
      if (empty) return false;
      const n = Number(raw);
      const a = Number(cond.value);
      const b = Number(cond.value2);

      switch (cond.operator) {
        case 'equals': return n === a;
        case 'notEquals': return n !== a;
        case 'gt': return n > a;
        case 'gte': return n >= a;
        case 'lt': return n < a;
        case 'lte': return n <= a;
        case 'between': return n >= Math.min(a, b) && n <= Math.max(a, b);
        default: return true;
      }
    }

    const s = String(raw ?? '').toLowerCase();
    const q = cond.value.trim().toLowerCase();

    switch (cond.operator) {
      case 'contains': return s.includes(q);
      case 'notContains': return !s.includes(q);
      case 'equals': return s === q;
      case 'notEquals': return s !== q;
      case 'startsWith': return s.startsWith(q);
      default: return true;
    }
  }

  // Blank conditions are ignored; an empty query matches everything.
  evaluateGroup(group: QueryGroup, customer: CustomerModel, customerNumber: NumberFn): boolean {
    const results: boolean[] = [
      ...group.conditions
        .filter((c) => this.isConditionComplete(c))
        .map((c) => this.evaluateCondition(c, customer, customerNumber)),
      ...group.groups
        .filter((g) => this.countActive(g) > 0)
        .map((g) => this.evaluateGroup(g, customer, customerNumber)),
    ];

    if (results.length === 0) return true;

    return group.combinator === 'AND' ? results.every(Boolean) : results.some(Boolean);
  }

  // PREVIEW TEXT: [Credit Limit] > 100000 AND [VAT Status] = VAT registered
  describeGroup(group: QueryGroup, isRoot = true): string {
    const parts = [
      ...group.conditions
        .filter((c) => this.isConditionComplete(c))
        .map((c) => {
          const def = this.fieldDef(c.field);
          const label = (v: string) => def.options?.find((o) => o.value === v)?.label ?? v;
          let text = `[${def.label}] ${SYMBOL[c.operator]}`;

          if (this.needsValue(c.operator)) {
            text += c.operator === 'between' ? ` ${c.value} and ${c.value2}` : ` ${label(c.value)}`;
          }

          return text;
        }),
      ...group.groups
        .filter((g) => this.countActive(g) > 0)
        .map((g) => this.describeGroup(g, false)),
    ];

    const joined = parts.join(` ${group.combinator} `);

    return !isRoot && parts.length > 1 ? `(${joined})` : joined;
  }
}