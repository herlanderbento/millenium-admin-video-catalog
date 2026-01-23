import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

export type EventRecord = CreateEventDto & {
  id: string;
};

@Injectable()
export class EventsService {
  private readonly events = new Map<string, EventRecord>();

  create(dto: CreateEventDto): EventRecord {
    const event: EventRecord = {
      id: uuidv4(),
      ...dto,
    };
    this.events.set(event.id, event);
    return event;
  }

  findAll(): EventRecord[] {
    return Array.from(this.events.values());
  }

  findOne(id: string): EventRecord {
    const event = this.events.get(id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  update(id: string, dto: UpdateEventDto): EventRecord {
    const event = this.findOne(id);
    const updates = Object.fromEntries(
      Object.entries(dto).filter(([, value]) => value !== undefined),
    ) as Partial<EventRecord>;
    const updated: EventRecord = {
      ...event,
      ...updates,
    };
    this.events.set(id, updated);
    return updated;
  }

  remove(id: string): void {
    this.findOne(id);
    this.events.delete(id);
  }
}
