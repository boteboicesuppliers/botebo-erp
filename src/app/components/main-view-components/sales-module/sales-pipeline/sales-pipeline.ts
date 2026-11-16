import { Component } from '@angular/core';
import { PipelineKpiOverview } from '../../../layout/sales-module/sales-pipeline/pipeline-kpi-overview/pipeline-kpi-overview';
import { PipelineBoardWidget } from '../../../layout/sales-module/sales-pipeline/pipeline-board-widget/pipeline-board-widget';
import { PipelineAnalyticsWidget } from '../../../layout/sales-module/sales-pipeline/pipeline-analytics-widget/pipeline-analytics-widget';

@Component({
  selector: 'app-sales-pipeline',
  imports: [
    PipelineKpiOverview,
    PipelineBoardWidget,
    PipelineAnalyticsWidget,
  ],
  templateUrl: './sales-pipeline.html',
  styleUrl: './sales-pipeline.css',
})
export class SalesPipeline {
  // Main container logic for the Sales Pipeline view
}