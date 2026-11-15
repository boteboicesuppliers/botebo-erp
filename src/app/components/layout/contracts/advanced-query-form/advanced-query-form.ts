import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, computed, inject, input, output, signal } from '@angular/core';
import {
  AdvancedQuery,
  QueryCondition,
  QueryGroup,
  QueryOperator,
} from '../../../../services/customers/advanced-query';

@Component({
  selector: 'app-advanced-query-form',
  imports: [NgTemplateOutlet],
  templateUrl: './advanced-query-form.html',
})
export class AdvancedQueryForm implements OnInit {
  private q = inject(AdvancedQuery);

  // Previously applied query (so reopening the form shows it again)
  initial = input<QueryGroup | null>(null);

  closed = output<void>();
  run = output<QueryGroup>();
  cleared = output<void>();

  // Used by the template
  readonly fields = this.q.fields;
  readonly fieldDef = (key: string) => this.q.fieldDef(key);
  readonly needsValue = (op: QueryOperator) => this.q.needsValue(op);
  readonly operatorsFor = (key: string) => this.q.operatorsFor(key);

  root = signal<QueryGroup>(this.seed());

  activeCount = computed(() => this.q.countActive(this.root()));
  preview = computed(() => this.q.describeGroup(this.root()));

  ngOnInit(): void {
    const initial = this.initial();

    if (initial) {
      this.root.set(structuredClone(initial));
    }
  }

  // ACTIONS

  addCondition(groupId: string): void {
    this.mutate((root) => this.find(root, groupId)?.conditions.push(this.q.createCondition()));
  }

  removeCondition(groupId: string, conditionId: string): void {
    this.mutate((root) => {
      const g = this.find(root, groupId);

      if (g) g.conditions = g.conditions.filter((c) => c.id !== conditionId);
    });
  }

  addGroup(groupId: string): void {
    this.mutate((root) => {
      const sub = this.q.createGroup();

      sub.conditions.push(this.q.createCondition());
      this.find(root, groupId)?.groups.push(sub);
    });
  }

  removeGroup(groupId: string): void {
    this.mutate((root) => this.removeById(root, groupId));
  }

  setCombinator(groupId: string, value: string): void {
    this.mutate((root) => {
      const g = this.find(root, groupId);

      if (g) g.combinator = value === 'OR' ? 'OR' : 'AND';
    });
  }

  setField(groupId: string, conditionId: string, field: string): void {
    this.updateCondition(groupId, conditionId, (c) => {
      c.field = field;
      c.operator = this.q.operatorsFor(field)[0].value;
      c.value = '';
      c.value2 = '';
    });
  }

  setOperator(groupId: string, conditionId: string, operator: string): void {
    this.updateCondition(groupId, conditionId, (c) => (c.operator = operator as QueryOperator));
  }

  setValue(groupId: string, conditionId: string, value: string): void {
    this.updateCondition(groupId, conditionId, (c) => (c.value = value));
  }

  setValue2(groupId: string, conditionId: string, value: string): void {
    this.updateCondition(groupId, conditionId, (c) => (c.value2 = value));
  }

  clearAll(): void {
    this.root.set(this.seed());
    this.cleared.emit();
  }

  runQuery(): void {
    this.run.emit(structuredClone(this.root()));
  }

  // HELPERS

  private seed(): QueryGroup {
    const g = this.q.createGroup();

    g.conditions.push(this.q.createCondition());

    return g;
  }

  private mutate(fn: (root: QueryGroup) => void): void {
    const copy = structuredClone(this.root());

    fn(copy);
    this.root.set(copy);
  }

  private updateCondition(groupId: string, conditionId: string, fn: (c: QueryCondition) => void): void {
    this.mutate((root) => {
      const c = this.find(root, groupId)?.conditions.find((x) => x.id === conditionId);

      if (c) fn(c);
    });
  }

  private find(group: QueryGroup, id: string): QueryGroup | null {
    if (group.id === id) return group;

    for (const sub of group.groups) {
      const hit = this.find(sub, id);

      if (hit) return hit;
    }

    return null;
  }

  private removeById(group: QueryGroup, id: string): void {
    group.groups = group.groups.filter((g) => g.id !== id);
    group.groups.forEach((g) => this.removeById(g, id));
  }
}