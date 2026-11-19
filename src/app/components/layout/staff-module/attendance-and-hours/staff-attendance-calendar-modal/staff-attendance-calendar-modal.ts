import { Component, computed, effect, input, output, signal } from '@angular/core';
import {
  AttendanceEntryRecord,
  AttendanceStatus,
} from '../attendance-list-widget/attendance-list-widget';

export type CalendarGranularity = 'Month' | 'Day' | 'Week' | 'Year';

export interface CalendarAdherenceCell {
  date: string; // YYYY-MM-DD
  dayOfMonth: number;
  dayLabel: string; // Mon, Tue, ...
  weekdayFull: string; // Monday, Tuesday, ...
  monthShort: string; // Apr, May, ...
  monthFull: string; // April, May, ...
  inCurrentMonth: boolean;
  status: AttendanceStatus | 'Scheduled' | 'Off';
  clockIn: string;
  clockOut: string;
  regularHours: number;
  overtimeHours: number;
  itemCount: number;
  itemLabel: string;
  location: string;
  notes: string;
}

export interface DayTimelineItem {
  time: string;
  title: string;
  detail: string;
  status: CalendarAdherenceCell['status'];
}

export interface YearMonthSummary {
  monthIndex: number;
  monthShort: string;
  monthName: string;
  adherenceRate: number;
  regularHours: number;
  overtimeHours: number;
  totalDaysCount: number;
  loggedCount: number;
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

  granularity = signal<CalendarGranularity>('Month');
  activeDate = signal<string>('2026-11-19');

  readonly weekdayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  private readonly weekdayFullNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
  ];
  private readonly monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  constructor() {
    effect(() => {
      const current = this.entry();
      if (current?.attendanceDate) {
        this.activeDate.set(current.attendanceDate);
      }
    });
  }

  private parseDate(isoDate: string): Date {
    const [y, m, d] = isoDate.split('-').map(Number);
    if (!y || !m || !d) {
      return new Date(2026, 10, 19);
    }
    return new Date(y, m - 1, d);
  }

  private formatIsoDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  private buildCellForDate(date: Date, inCurrentMonth: boolean): CalendarAdherenceCell {
    const iso = this.formatIsoDate(date);
    const current = this.entry();
    const staffLogs = this.allRecords().filter(
      (r) => r.staffId === current.staffId || r.staffName === current.staffName
    );
    const matched =
      staffLogs.find((r) => r.attendanceDate === iso) ||
      (iso === current.attendanceDate ? current : null);

    const dayOfWeek = date.getDay(); // 0 = Sun ... 6 = Sat
    const mondayIdx = (dayOfWeek + 6) % 7;
    const dayLabel = this.weekdayHeaders[mondayIdx];
    const weekdayFull = this.weekdayFullNames[dayOfWeek];
    const monthIndex = date.getMonth();
    const monthFull = this.monthNames[monthIndex];
    const monthShort = monthFull.slice(0, 3);
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (matched) {
      const totalHrs = matched.regularHours + matched.overtimeHours;
      const count = matched.overtimeHours > 0 ? 2 : 1;
      return {
        date: iso,
        dayOfMonth: date.getDate(),
        dayLabel,
        weekdayFull,
        monthShort,
        monthFull,
        inCurrentMonth,
        status: matched.status,
        clockIn: matched.clockIn,
        clockOut: matched.clockOut,
        regularHours: matched.regularHours,
        overtimeHours: matched.overtimeHours,
        itemCount: count,
        itemLabel: `${matched.status} · ${totalHrs.toFixed(1)}h`,
        location: matched.location,
        notes: matched.notes || 'Logged attendance record',
      };
    }

    if (isWeekend) {
      return {
        date: iso,
        dayOfMonth: date.getDate(),
        dayLabel,
        weekdayFull,
        monthShort,
        monthFull,
        inCurrentMonth,
        status: 'Off',
        clockIn: '--:--',
        clockOut: '--:--',
        regularHours: 0,
        overtimeHours: 0,
        itemCount: 0,
        itemLabel: 'Off duty',
        location: current.location,
        notes: 'Scheduled non-working day',
      };
    }

    const patternCount = ((date.getDate() + mondayIdx) % 3) + 1;
    return {
      date: iso,
      dayOfMonth: date.getDate(),
      dayLabel,
      weekdayFull,
      monthShort,
      monthFull,
      inCurrentMonth,
      status: 'Scheduled',
      clockIn: '--:--',
      clockOut: '--:--',
      regularHours: 8,
      overtimeHours: 0,
      itemCount: patternCount,
      itemLabel: `Scheduled · 8.0h`,
      location: current.location,
      notes: `Rostered window ${current.scheduledWindow}`,
    };
  }

  activeDateObj = computed(() => this.parseDate(this.activeDate()));

  headerBreadcrumb = computed(() => {
    const dt = this.activeDateObj();
    const mode = this.granularity();
    const monthYear = `${this.monthNames[dt.getMonth()]} ${dt.getFullYear()}`;
    if (mode === 'Year') {
      return `Calendar > ${dt.getFullYear()}`;
    }
    if (mode === 'Day') {
      return `Calendar > ${this.monthNames[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`;
    }
    return `Calendar > ${monthYear}`;
  });

  selectedDayCell = computed<CalendarAdherenceCell>(() => {
    return this.buildCellForDate(this.activeDateObj(), true);
  });

  selectedDayAgenda = computed<DayTimelineItem[]>(() => {
    const cell = this.selectedDayCell();
    const current = this.entry();
    const [schedStart, schedEnd] = (current.scheduledWindow || '06:00 - 14:00')
      .split('-')
      .map((s) => s.trim());

    if (cell.status === 'Off') {
      return [
        {
          time: '00:00',
          title: 'Rest Day / Off Shift',
          detail: cell.location,
          status: 'Off',
        },
      ];
    }

    const items: DayTimelineItem[] = [
      {
        time: schedStart || '06:00',
        title: `Clock In (${cell.clockIn})`,
        detail: `${current.department} · ${cell.location}`,
        status: cell.status,
      },
      {
        time: schedEnd || '14:00',
        title: `Clock Out (${cell.clockOut})`,
        detail: `Regular: ${cell.regularHours.toFixed(2)}h`,
        status: cell.status,
      },
    ];

    if (cell.overtimeHours > 0) {
      items.push({
        time: '+OT',
        title: `Overtime Logged (${cell.overtimeHours.toFixed(2)}h)`,
        detail: cell.notes,
        status: 'Overtime',
      });
    } else if (cell.notes) {
      items.push({
        time: 'Note',
        title: cell.status,
        detail: cell.notes,
        status: cell.status,
      });
    }

    return items;
  });

  monthGridCells = computed<CalendarAdherenceCell[]>(() => {
    const dt = this.activeDateObj();
    const year = dt.getFullYear();
    const month = dt.getMonth();

    const firstOfMonth = new Date(year, month, 1);
    const startOffset = (firstOfMonth.getDay() + 6) % 7;
    const gridStart = new Date(year, month, 1 - startOffset);

    const cells: CalendarAdherenceCell[] = [];
    for (let i = 0; i < 42; i++) {
      const cellDate = new Date(
        gridStart.getFullYear(),
        gridStart.getMonth(),
        gridStart.getDate() + i
      );
      cells.push(this.buildCellForDate(cellDate, cellDate.getMonth() === month));
    }
    return cells;
  });

  weekGridCells = computed<CalendarAdherenceCell[]>(() => {
    const dt = this.activeDateObj();
    const mondayOffset = (dt.getDay() + 6) % 7;
    const weekStart = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() - mondayOffset);
    const targetMonth = dt.getMonth();

    const cells: CalendarAdherenceCell[] = [];
    for (let i = 0; i < 7; i++) {
      const cellDate = new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + i
      );
      cells.push(this.buildCellForDate(cellDate, cellDate.getMonth() === targetMonth));
    }
    return cells;
  });

  yearMonths = computed<YearMonthSummary[]>(() => {
    const year = this.activeDateObj().getFullYear();
    const current = this.entry();
    const staffLogs = this.allRecords().filter(
      (r) =>
        (r.staffId === current.staffId || r.staffName === current.staffName) &&
        r.attendanceDate.startsWith(`${year}-`)
    );

    return this.monthNames.map((name, monthIndex) => {
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      const monthPrefix = `${year}-${String(monthIndex + 1).padStart(2, '0')}-`;
      const logs = staffLogs.filter((r) => r.attendanceDate.startsWith(monthPrefix));
      const regularHours = logs.reduce((s, r) => s + r.regularHours, 0);
      const overtimeHours = logs.reduce((s, r) => s + r.overtimeHours, 0);
      const worked = logs.filter(
        (r) => r.status === 'Present' || r.status === 'Overtime' || r.status === 'Late'
      );
      const onTime = worked.filter(
        (r) => r.status === 'Present' || r.status === 'Overtime'
      );
      const adherenceRate =
        worked.length > 0 ? Math.round((onTime.length / worked.length) * 100) : 100;

      return {
        monthIndex,
        monthShort: name.slice(0, 3),
        monthName: name,
        adherenceRate,
        regularHours,
        overtimeHours,
        totalDaysCount: daysInMonth,
        loggedCount: logs.length,
      };
    });
  });

  stepPeriod(direction: -1 | 1): void {
    const dt = this.activeDateObj();
    const mode = this.granularity();

    if (mode === 'Day') {
      const next = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + direction);
      this.activeDate.set(this.formatIsoDate(next));
    } else if (mode === 'Week') {
      const next = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + direction * 7);
      this.activeDate.set(this.formatIsoDate(next));
    } else if (mode === 'Month') {
      const next = new Date(dt.getFullYear(), dt.getMonth() + direction, 1);
      this.activeDate.set(this.formatIsoDate(next));
    } else {
      const next = new Date(dt.getFullYear() + direction, dt.getMonth(), dt.getDate());
      this.activeDate.set(this.formatIsoDate(next));
    }
  }

  selectDay(isoDate: string): void {
    this.activeDate.set(isoDate);
  }

  selectMonthFromYear(monthIndex: number): void {
    const year = this.activeDateObj().getFullYear();
    const next = new Date(year, monthIndex, 1);
    this.activeDate.set(this.formatIsoDate(next));
    this.granularity.set('Month');
  }
}