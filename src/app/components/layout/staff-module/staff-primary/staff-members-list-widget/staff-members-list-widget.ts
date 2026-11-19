import { Component, computed, signal } from '@angular/core';
import { NewStaffMemberForm } from '../new-staff-member-form/new-staff-member-form';
import { EditStaffMemberEntryForm } from '../edit-staff-member-entry-form/edit-staff-member-entry-form';
import { DeleteStaffMemberForm } from '../delete-staff-member-form/delete-staff-member-form';

export type StaffStatus = 'Active' | 'On Leave' | 'Suspended';

export interface StaffMemberRecord {
  id: string;
  fullName: string;
  role: string;
  department: string;
  shift: string;
  contactPhone: string;
  status: StaffStatus;
}

@Component({
  selector: 'app-staff-members-list-widget',
  imports: [
    NewStaffMemberForm,
    EditStaffMemberEntryForm,
    DeleteStaffMemberForm,
  ],
  templateUrl: './staff-members-list-widget.html',
  styleUrl: './staff-members-list-widget.css',
})
export class StaffMembersListWidget {
  showNewModal = signal(false);
  editingMember = signal<StaffMemberRecord | null>(null);
  deletingMember = signal<StaffMemberRecord | null>(null);

  searchQuery = signal('');
  selectedStatus = signal<string>('All');
  currentPage = signal(1);
  pageSize = 5;

  staffMembers = signal<StaffMemberRecord[]>([
    {
      id: 'STF-2026-001',
      fullName: 'Sipho Khumalo',
      role: 'Senior Refrigeration Technician',
      department: 'Production Line A',
      shift: 'Day Shift (06:00 - 14:00)',
      contactPhone: '+27 82 419 2041',
      status: 'Active',
    },
    {
      id: 'STF-2026-002',
      fullName: 'Jabulani Mthethwa',
      role: 'Packaging Line Supervisor',
      department: 'Packaging Plant',
      shift: 'Day Shift (06:00 - 14:00)',
      contactPhone: '+27 73 882 5190',
      status: 'Active',
    },
    {
      id: 'STF-2026-003',
      fullName: 'Pieter van der Merwe',
      role: 'Plant Maintenance Engineer',
      department: 'Maintenance',
      shift: 'Night Shift (22:00 - 06:00)',
      contactPhone: '+27 83 610 9932',
      status: 'On Leave',
    },
    {
      id: 'STF-2026-004',
      fullName: 'Naledi Molefe',
      role: 'Cold Chain Dispatch Coordinator',
      department: 'Logistics & Fleet',
      shift: 'Afternoon Shift (14:00 - 22:00)',
      contactPhone: '+27 71 304 7765',
      status: 'Active',
    },
  ]);

  filteredStaff = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatus();

    return this.staffMembers().filter((member) => {
      const matchesSearch =
        member.id.toLowerCase().includes(q) ||
        member.fullName.toLowerCase().includes(q) ||
        member.role.toLowerCase().includes(q) ||
        member.department.toLowerCase().includes(q) ||
        member.contactPhone.toLowerCase().includes(q);
      const matchesStatus = status === 'All' || member.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredStaff().length / this.pageSize)));
  totalPagesArray = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
  startIndex = computed(() => (this.filteredStaff().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize + 1));
  endIndex = computed(() => Math.min(this.currentPage() * this.pageSize, this.filteredStaff().length));

  paginatedStaff = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredStaff().slice(start, start + this.pageSize);
  });

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage.set(p);
    }
  }

  handleCreateMember(data: Omit<StaffMemberRecord, 'id'>) {
    const nextNum = this.staffMembers().length + 1;
    const created: StaffMemberRecord = {
      id: `STF-2026-${String(nextNum).padStart(3, '0')}`,
      ...data,
    };
    this.staffMembers.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  handleUpdateMember(updated: StaffMemberRecord) {
    this.staffMembers.update((list) =>
      list.map((member) => (member.id === updated.id ? updated : member))
    );
    this.editingMember.set(null);
  }

  handleDeleteMember(id: string) {
    this.staffMembers.update((list) => list.filter((member) => member.id !== id));
    this.deletingMember.set(null);
  }

  getStatusBadgeClass(status: StaffStatus): string {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-900';
      case 'On Leave':
        return 'bg-amber-100 text-amber-900';
      case 'Suspended':
        return 'bg-red-100 text-red-900';
    }
  }
}