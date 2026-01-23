import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  Min,
  ValidateIf,
} from 'class-validator';

export enum EventAccessType {
  FREE = 'free',
  PAID = 'paid',
  COURSE_BONUS = 'course_bonus',
}

export enum EventInvitationType {
  FORMATION = 'formation',
  EMAIL = 'email',
}

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  event_type: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @Matches(TIME_REGEX)
  @IsNotEmpty()
  start_time: string;

  @Matches(TIME_REGEX)
  @IsNotEmpty()
  end_time: string;

  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsUrl({ require_protocol: true })
  @IsNotEmpty()
  event_link: string;

  @IsEnum(EventAccessType)
  @IsNotEmpty()
  access_type: EventAccessType;

  @ValidateIf(({ access_type }) => access_type === EventAccessType.PAID)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsNotEmpty()
  price?: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  max_capacity: number;

  @IsUUID('4')
  @IsNotEmpty()
  responsible_id: string;

  @IsUUID('4', { each: true })
  @IsArray()
  @IsOptional()
  guest_ids?: string[];

  @IsEnum(EventInvitationType)
  @IsNotEmpty()
  invitation_type: EventInvitationType;

  @ValidateIf(
    ({ invitation_type }) =>
      invitation_type === EventInvitationType.FORMATION,
  )
  @IsUUID('4')
  @IsNotEmpty()
  formation_id?: string;

  @ValidateIf(
    ({ invitation_type }) =>
      invitation_type === EventInvitationType.FORMATION,
  )
  @IsUUID('4', { each: true })
  @IsArray()
  @ArrayNotEmpty()
  formation_attendee_ids?: string[];

  @ValidateIf(
    ({ invitation_type }) => invitation_type === EventInvitationType.EMAIL,
  )
  @IsEmail({}, { each: true })
  @IsArray()
  @ArrayNotEmpty()
  invitee_emails?: string[];
}
