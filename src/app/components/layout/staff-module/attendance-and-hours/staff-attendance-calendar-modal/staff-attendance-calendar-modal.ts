import { Component, computed, effect, input, output, signal } from '@angular/core';
import {
  AttendanceEntryRecord,
  AttendanceStatus,
} from '../attendance-list-widget/attendance-list-widget';

export interface AdherenceDayCell {
  date: string;
  dayLabel: string;
  dayNum: string;
  status: AttendanceStatus | 'Scheduled' | 'Off';
  clockIn: string;
  clockOut: string;
  regularHours: number;
  overtimeHours: number;
  location: string;
  notes: string;
}

@Component({
  selector: 'app-staff-attendance-calendar-modal',
  imports: [],
  templateUrl: './staff-attendance-calendar-modal.html',
  styleUrl: './staff-attendance-calendar-modal.css',
})
export class StaffAttendanceCalendarModal {
  entry = input.required<AttendanceEntryRecord>();
  allRecords = input<AttendanceEntryRecord[]>([]);
  close = output<void>();

  selectedDayDate = signal<string>('');

  private readonly weekTemplate = [
    { date: '2026-11-16', dayLabel: 'Mon', dayNum: '16 Nov', defaultStatus: 'Present' as const, defaultIn: '06:00', defaultOut: '14:00', defaultReg: 8.0, defaultOt: 0.0, defaultNote: 'On-time shift adherence' },
    { date: '2026-11-17', dayLabel: 'Tue', dayNum: '17 Nov', defaultStatus: 'Present' as const, defaultIn: '05:58', defaultOut: '14:02', defaultReg: 8.0, defaultOt: 0.0, defaultNote: 'Completed assigned line checks' },
    { date: '2026-11-18', dayLabel: 'Wed', dayNum: '18 Nov', defaultStatus: 'Present' as const, defaultIn: '06:01', defaultOut: '14:00', defaultReg: 8.0, defaultOt: 0.0, defaultNote: 'Standard shift completed' },
    { date: '2026-11-19', dayLabel: 'Thu', dayNum: '19 Nov', defaultStatus: 'Scheduled' as const, defaultIn: '06:00', defaultOut: '14:00', defaultReg: 8.0, defaultOt: 0.0, defaultNote: 'Current shift window' },
    { date: '2026-11-20', dayLabel: 'Fri', dayNum: '20 Nov', defaultStatus: 'Scheduled' as const, defaultIn: '--:--', defaultOut: '--:--', defaultReg: 8.0, defaultOt: 0.0, defaultNote: 'Upcoming rostered shift' },
    { date: '2026-11-21', dayLabel: 'Sat', dayNum: '21 Nov', defaultStatus: 'Off' as const, defaultIn: '--:--', defaultOut: '--:--', defaultReg: 0.0, defaultOt: 0.0, defaultNote: 'Scheduled rest day' },
    { date: '2026-11-22', dayLabel: 'Sun', dayNum: '22 Nov', defaultStatus: 'Off' as const, defaultIn: '--:--', defaultOut: '--:--', defaultReg: 0.0, defaultOt: 0.0, defaultNote: 'Scheduled rest day' },
  ];

  constructor() {
    effect(() => {
      const current = this.entry();
      this.selectedDayDate.set(current.attendanceDate);
    });
  }

  calendarDays = computed<AdherenceDayCell[]>(() => {
    const current = this.entry();
    const staffLogs = this.allRecords().filter(
      (r) => r.staffId === current.staffId || r.staffName === current.staffName
    );

    return this.weekTemplate.map((tpl) => {
      const matched =
        staffLogs.find((r) => r.attendanceDate === tpl.date) ||
        (tpl.date === current.attendanceDate ? current : null);

      if (matched) {
        return {
          date: tpl.date,
          dayLabel: tpl.dayLabel,
          dayNum: tpl.dayNum,
          status: matched.status,
          clockIn: matched.clockIn,
          clockOut: matched.clockOut,
          regularHours: matched.regularHours,
          overtimeHours: matched.overtimeHours,
          location: matched.location,
          notes: matched.notes || 'Logged attendance entry',
        };
      }

      return {
        date: tpl.date,
        dayLabel: tpl.dayLabel,
        dayNum: tpl.dayNum,
        status: tpl.defaultStatus,
        clockIn: tpl.defaultIn,
        clockOut: tpl.defaultOut,
        regularHours: tpl.defaultReg,
        overtimeHours: tpl.defaultOt,
        location: current.location,
        notes: tpl.defaultNote,
      };
    });
  });

  selectedDay = computed<AdherenceDayCell>(() => {
    const days = this.calendarDays();
    return (
      days.find((d) => d.date === this.selectedDayDate()) ||
      days[0]
    );
  });

  adherenceSummary = computed(() => {
    const days = this.calendarDays();
    const workedDays = days.filter((d) =>
      d.status === 'Present' || d.status === 'Overtime' || d.status === 'Late'
    );
    const adherentDays = workedDays.filter(
      (d) => d.status === 'Present' || d.status === 'Overtime'
    );
    const rate =
      workedDays.length > 0
        ? Math.round((adherentDays.length / workedDays.length) * 100)
        : 100;
    const totalReg = days.reduce((sum, d) => sum + d.regularHours, 0);
    const totalOt = days.reduce((sum, d) => sum + d.overtimeHours, 0);
    const lateOrAbsent = days.filter(
      (d) => d.status === 'Late' || d.status === 'Absent'
    ).length;

    return {
      rate,
      totalReg,
      totalOt,
      lateOrAbsent,
    };
  });

  getCellStatusClass(status: AdherenceDayCell['status']): string {
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
      case 'Scheduled':
        return 'bg-[#dde9f7] text-[#1b5a9a]';
      case 'Off':
        return 'bg-slate-100 text-[#4b5563]';
    }
  }
}