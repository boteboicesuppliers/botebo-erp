import { Component, computed, signal } from '@angular/core';
import { NewAttendanceEntryForm } from '../new-attendance-entry-form/new-attendance-entry-form';
import { EditAttendanceEntryForm } from '../edit-attendance-entry-form/edit-attendance-entry-form';
import { DeleteAttendanceEntryForm } from '../delete-attendance-entry-form/delete-attendance-entry-form';
import { StaffAttendanceCalendarModal } from '../staff-attendance-calendar-modal/staff-attendance-calendar-modal';

export type AttendanceStatus = 'Present' | 'Late' | 'Overtime' | 'Absent' | 'On Leave';

export interface AttendanceEntryRecord {
  id: string;
  staffName: string;
  staffId: string;
  shiftRef: string;
  department: string;
  location: string;
  attendanceDate: string;
  scheduledWindow: string;
  clockIn: string;
  clockOut: string;
  regularHours: number;
  overtimeHours: number;
  status: AttendanceStatus;
  notes: string;
}

@Component({
  selector: 'app-attendance-list-widget',
  imports: [
    NewAttendanceEntryForm,
    EditAttendanceEntryForm,
    DeleteAttendanceEntryForm,
    StaffAttendanceCalendarModal,
  ],
  templateUrl: './attendance-list-widget.html',
  styleUrl: './attendance-list-widget.css',
})
export class AttendanceListWidget {
  showNewModal = signal(false);
  editingAttendance = signal<AttendanceEntryRecord | null>(null);
  deletingAttendance = signal<AttendanceEntryRecord | null>(null);
  viewingCalendarEntry = signal<AttendanceEntryRecord | null>(null);

  searchQuery = signal('');
  selectedLocation = signal<string>('All');
  selectedStatus = signal<string>('All');
  currentPage = signal(1);
  pageSize = 5;

  attendanceRecords = signal<AttendanceEntryRecord[]>([
    {
      id: 'ATT-2026-001',
      staffName: 'Sipho Khumalo',
      staffId: 'STF-2026-001',
      shiftRef: 'SHF-2026-101',
      department: 'Production Line A',
      location: '3 Gaus Court, CW2, Vanderbijlpark',
      attendanceDate: '2026-11-19',
      scheduledWindow: '06:00 - 14:00',
      clockIn: '05:54',
      clockOut: '15:30',
      regularHours: 8.0,
      overtimeHours: 1.5,
      status: 'Overtime',
      notes: 'Extended cold-room chiller check',
    },
    {
      id: 'ATT-2026-002',
      staffName: 'Jabulani Mthethwa',
      staffId: 'STF-2026-002',
      shiftRef: 'SHF-2026-102',
      department: 'Packaging Plant',
      location: '3 Gaus Court, CW2, Vanderbijlpark',
      attendanceDate: '2026-11-19',
      scheduledWindow: '08:00 - 16:00',
      clockIn: '07:58',
      clockOut: '16:02',
      regularHours: 8.0,
      overtimeHours: 0.0,
      status: 'Present',
      notes: 'Standard bag-sealing shift',
    },
    {
      id: 'ATT-2026-003',
      staffName: 'Naledi Molefe',
      staffId: 'STF-2026-004',
      shiftRef: 'SHF-2026-103',
      department: 'Logistics & Fleet',
      location: '14 Industrial Blvd, Sebokeng, Vereeniging',
      attendanceDate: '2026-11-19',
      scheduledWindow: '14:00 - 22:00',
      clockIn: '14:22',
      clockOut: '22:00',
      regularHours: 7.5,
      overtimeHours: 0.0,
      status: 'Late',
      notes: 'Traffic delay on R59',
    },
    {
      id: 'ATT-2026-004',
      staffName: 'Pieter van der Merwe',
      staffId: 'STF-2026-003',
      shiftRef: 'SHF-2026-104',
      department: 'Maintenance',
      location: '3 Gaus Court, CW2, Vanderbijlpark',
      attendanceDate: '2026-11-18',
      scheduledWindow: '12:00 - 20:00',
      clockIn: '11:55',
      clockOut: '20:05',
      regularHours: 8.0,
      overtimeHours: 0.0,
      status: 'Present',
      notes: 'Valve seal replacement completed',
    },
    {
      id: 'ATT-2026-005',
      staffName: 'Thabo Dlamini',
      staffId: 'STF-2026-005',
      shiftRef: 'SHF-2026-105',
      department: 'Production Line A',
      location: '88 Voortrekker St, Sasolburg',
      attendanceDate: '2026-11-18',
      scheduledWindow: '06:00 - 14:00',
      clockIn: '--:--',
      clockOut: '--:--',
      regularHours: 0.0,
      overtimeHours: 0.0,
      status: 'On Leave',
      notes: 'Approved family leave',
    },
  ]);

  availableLocations = computed(() => {
    const set = new Set(this.attendanceRecords().map((r) => r.location));
    return Array.from(set);
  });

  filteredAttendance = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const loc = this.selectedLocation();
    const status = this.selectedStatus();

    return this.attendanceRecords().filter((entry) => {
      const matchesSearch =
        entry.id.toLowerCase().includes(q) ||
        entry.staffName.toLowerCase().includes(q) ||
        entry.staffId.toLowerCase().includes(q) ||
        entry.shiftRef.toLowerCase().includes(q) ||
        entry.department.toLowerCase().includes(q) ||
        entry.location.toLowerCase().includes(q) ||
        entry.notes.toLowerCase().includes(q);
      const matchesLocation = loc === 'All' || entry.location === loc;
      const matchesStatus = status === 'All' || entry.status === status;
      return matchesSearch && matchesLocation && matchesStatus;
    });
  });

  totalRegularHours = computed(() =>
    this.filteredAttendance().reduce((sum, r) => sum + r.regularHours, 0)
  );

  totalOvertimeHours = computed(() =>
    this.filteredAttendance().reduce((sum, r) => sum + r.overtimeHours, 0)
  );

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredAttendance().length / this.pageSize))
  );
  totalPagesArray = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );
  startIndex = computed(() =>
    this.filteredAttendance().length === 0
      ? 0
      : (this.currentPage() - 1) * this.pageSize + 1
  );
  endIndex = computed(() =>
    Math.min(this.currentPage() * this.pageSize, this.filteredAttendance().length)
  );

  paginatedAttendance = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredAttendance().slice(start, start + this.pageSize);
  });

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage.set(p);
    }
  }

  getTotalHours(entry: AttendanceEntryRecord): number {
    return entry.regularHours + entry.overtimeHours;
  }

  formatHours(val: number): string {
    return `${val.toFixed(2)} hrs`;
  }

  handleCreateAttendance(data: Omit<AttendanceEntryRecord, 'id'>) {
    const nextNum = this.attendanceRecords().length + 1;
    const created: AttendanceEntryRecord = {
      id: `ATT-2026-${String(nextNum).padStart(3, '0')}`,
      ...data,
    };
    this.attendanceRecords.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  handleUpdateAttendance(updated: AttendanceEntryRecord) {
    this.attendanceRecords.update((list) =>
      list.map((entry) => (entry.id === updated.id ? updated : entry))
    );
    this.editingAttendance.set(null);
  }

  handleDeleteAttendance(id: string) {
    this.attendanceRecords.update((list) => list.filter((entry) => entry.id !== id));
    this.deletingAttendance.set(null);
  }

  getStatusBadgeClass(status: AttendanceStatus): string {
    switch (status) {
      case 'Present':
        return 'bg-emerald-100 text-emerald-900';
      case 'Overtime':
        return 'bg-sky-100 text-sky-900';
      case 'Late':
        return 'bg-amber-100 text-amber-900';
      case 'On Leave':
        return 'bg-slate-200 text-slate-800';
      case 'Absent':
        return 'bg-red-100 text-red-900';
    }
  }
}