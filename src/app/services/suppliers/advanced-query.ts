import { Injectable, signal } from '@angular/core';
import {
  SupplierModel,
  SUPPLIER_CURRENCIES,
  SUPPLIER_STATUSES,
  SUPPLIER_TYPES,
} from '../../models/suppliers/supplier-model';

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

type NumberFn = (s: SupplierModel) => string;

const STORAGE_KEY = 'botebo-erp.supplier-saved-queries';

const toOptions = (values: string[]) => values.map((v) => ({ value: v, label: v }));

const SYMBOL: Record<QueryOperator, string> = {
  contains: 'contains', notContains: 'does not contain', equals: '=', notEquals: '≠',
  startsWith: 'starts with', gt: '>', gte: '≥', lt: '<', lte: '≤', between: 'between',
  isEmpty: 'is empty', isNotEmpty: 'is not empty',
};

@Injectable({ providedIn: 'root' })
export class AdvancedQuery {
  readonly fields: QueryFieldDef[] = [
    { key: 'supplierNumber', label: 'Supplier Number', type: 'text' },
    { key: 'name', label: 'Business / Individual Name', type: 'text' },
    { key: 'status', label: 'Status', type: 'enum', options: toOptions(SUPPLIER_STATUSES) },
    { key: 'supplierType', label: 'Supplier Type', type: 'enum', options: toOptions(SUPPLIER_TYPES) },
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'email', label: 'Supplier Email', type: 'text' },
    { key: 'phone', label: 'Supplier Phone', type: 'text' },
    { key: 'contactFirstName', label: 'Contact First Name', type: 'text' },
    { key: 'contactLastName', label: 'Contact Last Name', type: 'text' },
    { key: 'contactEmail', label: 'Contact Email', type: 'text' },
    {
      key: 'vatRegistered', label: 'VAT Status', type: 'enum',
      options: [{ value: 'true', label: 'VAT registered' }, { value: 'false', label: 'Not VAT registered' }],
    },
    { key: 'vatNumber', label: 'VAT Number', type: 'text' },
    { key: 'creditLimit', label: 'Credit Limit', type: 'number' },
    { key: 'paymentTerm', label: 'Payment Term', type: 'enum', options: toOptions(['Cash on Delivery', 'Custom Term']) },
    { key: 'paymentDays', label: 'Payment Days', type: 'number' },
    { key: 'currency', label: 'Currency', type: 'enum', options: toOptions(SUPPLIER_CURRENCIES) },
    { key: 'bankName', label: 'Bank Name', type: 'text' },
    { key: 'bankAccountNumber', label: 'Bank Account Number', type: 'text' },
    { key: 'branchCode', label: 'Branch Code', type: 'text' },
    { key: 'leadTimeDays', label: 'Lead Time (Days)', type: 'number' },
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
    return { id: this.uid(), field: 'name', operator: 'contains', value: '', value2: '' };
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

  private getFieldValue(s: SupplierModel, key: string, supplierNumber: NumberFn): unknown {
    switch (key) {
      case 'supplierNumber': return supplierNumber(s);
      case 'vatRegistered': return String(s.vatRegistered);
      case 'status': return s.status ?? 'Pending Approval';
      default: return (s as unknown as Record<string, unknown>)[key];
    }
  }

  evaluateCondition(cond: QueryCondition, supplier: SupplierModel, supplierNumber: NumberFn): boolean {
    const def = this.fieldDef(cond.field);
    const raw = this.getFieldValue(supplier, cond.field, supplierNumber);
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
  evaluateGroup(group: QueryGroup, supplier: SupplierModel, supplierNumber: NumberFn): boolean {
    const results: boolean[] = [
      ...group.conditions
        .filter((c) => this.isConditionComplete(c))
        .map((c) => this.evaluateCondition(c, supplier, supplierNumber)),
      ...group.groups
        .filter((g) => this.countActive(g) > 0)
        .map((g) => this.evaluateGroup(g, supplier, supplierNumber)),
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