import {
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Min,
  ValidateNested,
  validateSync,
} from 'class-validator';
import { FileMediaInput } from '../../../../video/application/use-cases/common/file-media.input';

export enum EventAccessType {
  FREE = 'FREE',
  PAID = 'PAID',
  COURSE_BONUS = 'COURSE_BONUS',
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export type CreateEventInputConstructorProps = {
  name: string;
  event_type_id: string;
  description: string;
  cover_image?: FileMediaInput;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  platform: string;
  event_link?: string;
  access_type: EventAccessType;
  price?: number;
  capacity: number;
  responsible_ids: string[];
  guest_ids?: string[];
  formation_ids?: string[];
  invited_student_ids?: string[];
  invited_emails?: string[];
  status?: EventStatus;
};

export class CreateEventInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID('4')
  @IsNotEmpty()
  event_type_id: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @ValidateNested()
  cover_image?: FileMediaInput;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;

  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsOptional()
  @IsUrl()
  event_link?: string;

  @IsEnum(EventAccessType)
  @IsNotEmpty()
  access_type: EventAccessType;

  @IsOptional()
  @IsInt()
  @Min(0)
  price?: number;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsUUID('4', { each: true })
  @IsArray()
  @IsNotEmpty()
  responsible_ids: string[];

  @IsUUID('4', { each: true })
  @IsArray()
  @IsOptional()
  guest_ids?: string[];

  @IsUUID('4', { each: true })
  @IsArray()
  @IsOptional()
  formation_ids?: string[];

  @IsUUID('4', { each: true })
  @IsArray()
  @IsOptional()
  invited_student_ids?: string[];

  @IsEmail({}, { each: true })
  @IsArray()
  @IsOptional()
  invited_emails?: string[];

  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;

  constructor(props?: CreateEventInputConstructorProps) {
    if (!props) return;

    this.name = props.name;
    this.event_type_id = props.event_type_id;
    this.description = props.description;
    this.cover_image = props.cover_image;
    this.start_date = props.start_date;
    this.end_date = props.end_date;
    this.start_time = props.start_time;
    this.end_time = props.end_time;
    this.platform = props.platform;
    this.event_link = props.event_link;
    this.access_type = props.access_type;
    this.price = props.price;
    this.capacity = props.capacity;
    this.responsible_ids = props.responsible_ids;
    this.guest_ids = props.guest_ids;
    this.formation_ids = props.formation_ids;
    this.invited_student_ids = props.invited_student_ids;
    this.invited_emails = props.invited_emails;
    this.status = props.status;
  }
}

export class ValidateCreateEventInput {
  static validate(input: CreateEventInput) {
    return validateSync(input);
  }
}
