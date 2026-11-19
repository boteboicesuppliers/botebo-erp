import { Component, computed, signal } from '@angular/core';
import { NewShiftEntryForm } from '../new-shift-entry-form/new-shift-entry-form';
import { EditShiftEntryForm } from '../edit-shift-entry-form/edit-shift-entry-form';
import { DeleteShiftEntryForm } from '../delete-shift-entry-form/delete-shift-entry-form';

export type ShiftStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
export type ScheduleViewMode = 'Calendar' | 'Timeline';

export interface ShiftEntryRecord {
  id: string;
  staffName: string;
  role: string;
  department: string;
  location: string;
  shiftDate: string;
  startTime: string;
  endTime: string;
  status: ShiftStatus;
}

@Component({
  selector: 'app-shifts-list-widget',
  imports: [
    NewShiftEntryForm,
    EditShiftEntryForm,
    DeleteShiftEntryForm,
  ],
  templateUrl: './shifts-list-widget.html',
  styleUrl: './shifts-list-widget.css',
})
export class ShiftsListWidget {
  showNewModal = signal(false);
  editingShift = signal<ShiftEntryRecord | null>(null);
  deletingShift = signal<ShiftEntryRecord | null>(null);

  viewMode = signal<ScheduleViewMode>('Calendar');
  searchQuery = signal('');
  selectedLocation = signal<string>('All');
  selectedStatus = signal<string>('All');

  // Calendar drag state
  draggedCalendarShiftId = signal<string | null>(null);
  dragOverDayDate = signal<string | null>(null);

  // Timeline drag state
  draggingTimelineShiftId = signal<string | null>(null);
  private timelineDragState: {
    shiftId: string;
    trackWidth: number;
    durationHours: number;
    previewStart: string;
    previewEnd: string;
  } | null = null;
  timelinePreview = signal<{ shiftId: string; startTime: string; endTime: string } | null>(null);

  readonly timelineHours = [
    '06:00',
    '08:00',
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
    '20:00',
    '22:00',
  ];

  readonly calendarDays = [
    { date: '2026-11-16', label: 'Mon', dayNum: '16 Nov' },
    { date: '2026-11-17', label: 'Tue', dayNum: '17 Nov' },
    { date: '2026-11-18', label: 'Wed', dayNum: '18 Nov' },
    { date: '2026-11-19', label: 'Thu', dayNum: '19 Nov' },
    { date: '2026-11-20', label: 'Fri', dayNum: '20 Nov' },
    { date: '2026-11-21', label: 'Sat', dayNum: '21 Nov' },
    { date: '2026-11-22', label: 'Sun', dayNum: '22 Nov' },
  ];

  shifts = signal<ShiftEntryRecord[]>([
    {
      id: 'SHF-2026-101',
      staffName: 'Sipho Khumalo',
      role: 'Senior Refrigeration Technician',
      department: 'Production Line A',
      location: '3 Gaus Court, CW2, Vanderbijlpark',
      shiftDate: '2026-11-19',
      startTime: '06:00',
      endTime: '14:00',
      status: 'In Progress',
    },
    {
      id: 'SHF-2026-102',
      staffName: 'Jabulani Mthethwa',
      role: 'Packaging Line Supervisor',
      department: 'Packaging Plant',
      location: '3 Gaus Court, CW2, Vanderbijlpark',
      shiftDate: '2026-11-19',
      startTime: '08:00',
      endTime: '16:00',
      status: 'In Progress',
    },
    {
      id: 'SHF-2026-103',
      staffName: 'Naledi Molefe',
      role: 'Cold Chain Dispatch Coordinator',
      department: 'Logistics & Fleet',
      location: '14 Industrial Blvd, Sebokeng, Vereeniging',
      shiftDate: '2026-11-19',
      startTime: '14:00',
      endTime: '22:00',
      status: 'Scheduled',
    },
    {
      id: 'SHF-2026-104',
      staffName: 'Pieter van der Merwe',
      role: 'Plant Maintenance Engineer',
      department: 'Maintenance',
      location: '3 Gaus Court, CW2, Vanderbijlpark',
      shiftDate: '2026-11-18',
      startTime: '12:00',
      endTime: '20:00',
      status: 'Completed',
    },
    {
      id: 'SHF-2026-105',
      staffName: 'Thabo Dlamini',
      role: 'Ice Block Harvest Operator',
      department: 'Production Line A',
      location: '88 Voortrekker St, Sasolburg',
      shiftDate: '2026-11-20',
      startTime: '06:00',
      endTime: '14:00',
      status: 'Scheduled',
    },
  ]);

  availableLocations = computed(() => {
    const set = new Set(this.shifts().map((s) => s.location));
    return Array.from(set);
  });

  filteredShifts = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const loc = this.selectedLocation();
    const status = this.selectedStatus();

    return this.shifts().filter((entry) => {
      const matchesSearch =
        entry.id.toLowerCase().includes(q) ||
        entry.staffName.toLowerCase().includes(q) ||
        entry.role.toLowerCase().includes(q) ||
        entry.department.toLowerCase().includes(q) ||
        entry.location.toLowerCase().includes(q);
      const matchesLocation = loc === 'All' || entry.location === loc;
      const matchesStatus = status === 'All' || entry.status === status;
      return matchesSearch && matchesLocation && matchesStatus;
    });
  });

  shiftsForDay(dateStr: string): ShiftEntryRecord[] {
    return this.filteredShifts().filter((s) => s.shiftDate === dateStr);
  }

  private timeToHours(hhmm: string): number {
    const [h, m] = hhmm.split(':').map(Number);
    return (Number.isFinite(h) ? h : 6) + (Number.isFinite(m) ? m / 60 : 0);
  }

  private hoursToTime(hoursDecimal: number): string {
    const clamped = Math.max(6, Math.min(22, hoursDecimal));
    const snappedMinutes = Math.round((clamped * 60) / 30) * 30;
    const boundedMinutes = Math.max(6 * 60, Math.min(22 * 60, snappedMinutes));
    const h = Math.floor(boundedMinutes / 60);
    const m = boundedMinutes % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  getDisplayStartTime(shift: ShiftEntryRecord): string {
    const preview = this.timelinePreview();
    if (preview && preview.shiftId === shift.id) {
      return preview.startTime;
    }
    return shift.startTime;
  }

  getDisplayEndTime(shift: ShiftEntryRecord): string {
    const preview = this.timelinePreview();
    if (preview && preview.shiftId === shift.id) {
      return preview.endTime;
    }
    return shift.endTime;
  }

  getTimelineLeftPercent(startTime: string): number {
    const startHour = 6;
    const totalSpan = 16;
    const raw = ((this.timeToHours(startTime) - startHour) / totalSpan) * 100;
    return Math.max(0, Math.min(85, raw));
  }

  getTimelineWidthPercent(startTime: string, endTime: string): number {
    const totalSpan = 16;
    const duration = Math.max(1.5, this.timeToHours(endTime) - this.timeToHours(startTime));
    const width = (duration / totalSpan) * 100;
    return Math.max(14, Math.min(100 - this.getTimelineLeftPercent(startTime), width));
  }

  // --- CALENDAR DRAG & DROP ---
  onCalendarDragStart(shiftId: string, event: DragEvent): void {
    this.draggedCalendarShiftId.set(shiftId);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', shiftId);
    }
  }

  onCalendarDragOver(dayDate: string, event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    if (this.dragOverDayDate() !== dayDate) {
      this.dragOverDayDate.set(dayDate);
    }
  }

  onCalendarDrop(dayDate: string, event: DragEvent): void {
    event.preventDefault();
    const shiftId =
      this.draggedCalendarShiftId() || event.dataTransfer?.getData('text/plain') || '';

    if (shiftId) {
      this.shifts.update((list) =>
        list.map((entry) =>
          entry.id === shiftId ? { ...entry, shiftDate: dayDate } : entry
        )
      );
    }

    this.draggedCalendarShiftId.set(null);
    this.dragOverDayDate.set(null);
  }

  onCalendarDragEnd(): void {
    this.draggedCalendarShiftId.set(null);
    this.dragOverDayDate.set(null);
  }

  // --- TIMELINE HORIZONTAL DRAG ---
  startTimelineDrag(shift: ShiftEntryRecord, trackEl: HTMLElement, event: PointerEvent): void {
    if ((event.target as HTMLElement | null)?.closest('button')) {
      return;
    }

    event.preventDefault();
    const rect = trackEl.getBoundingClientRect();
    const trackWidth = Math.max(1, rect.width);
    const startH = this.timeToHours(shift.startTime);
    const endH = this.timeToHours(shift.endTime);
    const durationHours = Math.max(1, endH - startH);
    const startX = event.clientX;

    this.draggingTimelineShiftId.set(shift.id);
    this.timelineDragState = {
      shiftId: shift.id,
      trackWidth,
      durationHours,
      previewStart: shift.startTime,
      previewEnd: shift.endTime,
    };
    this.timelinePreview.set({
      shiftId: shift.id,
      startTime: shift.startTime,
      endTime: shift.endTime,
    });

    const onMove = (moveEvent: PointerEvent) => {
      if (!this.timelineDragState) return;
      const deltaX = moveEvent.clientX - startX;
      const deltaHours = (deltaX / this.timelineDragState.trackWidth) * 16;

      let nextStartH = startH + deltaHours;
      nextStartH = Math.max(6, Math.min(22 - this.timelineDragState.durationHours, nextStartH));

      const nextStartTime = this.hoursToTime(nextStartH);
      const snappedStartH = this.timeToHours(nextStartTime);
      const nextEndTime = this.hoursToTime(snappedStartH + this.timelineDragState.durationHours);

      this.timelineDragState.previewStart = nextStartTime;
      this.timelineDragState.previewEnd = nextEndTime;
      this.timelinePreview.set({
        shiftId: shift.id,
        startTime: nextStartTime,
        endTime: nextEndTime,
      });
    };

    const onUp = () => {
      const state = this.timelineDragState;
      this.draggingTimelineShiftId.set(null);
      this.timelineDragState = null;
      this.timelinePreview.set(null);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);

      if (state) {
        this.shifts.update((list) =>
          list.map((entry) =>
            entry.id === state.shiftId
              ? { ...entry, startTime: state.previewStart, endTime: state.previewEnd }
              : entry
          )
        );
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  }

  handleCreateShift(data: Omit<ShiftEntryRecord, 'id'>) {
    const nextNum = 101 + this.shifts().length;
    const created: ShiftEntryRecord = {
      id: `SHF-2026-${nextNum}`,
      ...data,
    };
    this.shifts.update((list) => [created, ...list]);
    this.showNewModal.set(false);
  }

  handleUpdateShift(updated: ShiftEntryRecord) {
    this.shifts.update((list) =>
      list.map((entry) => (entry.id === updated.id ? updated : entry))
    );
    this.editingShift.set(null);
  }

  handleDeleteShift(id: string) {
    this.shifts.update((list) => list.filter((entry) => entry.id !== id));
    this.deletingShift.set(null);
  }

  getStatusBadgeClass(status: ShiftStatus): string {
    switch (status) {
      case 'Scheduled':
        return 'bg-sky-100 text-sky-900';
      case 'In Progress':
        return 'bg-emerald-100 text-emerald-900';
      case 'Completed':
        return 'bg-slate-200 text-slate-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-900';
    }
  }
}