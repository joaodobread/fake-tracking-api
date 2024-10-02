import { Controller, Post } from '@nestjs/common';
import { TrackingScheduleTask } from './tracking-schedule.task';

@Controller('tasks')
export class ScheduleController {
  constructor(private readonly trackingScheduleTask: TrackingScheduleTask) {}

  @Post('exec/tracking')
  async execTracking() {
    return this.trackingScheduleTask.execute();
    // .then(() => Logger.log('ALL_TRACKING_SENT'))
    // .catch(() => Logger.error('ERROR'));
  }
}
