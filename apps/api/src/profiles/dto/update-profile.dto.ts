import {
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @Length(2, 60)
  @Matches(/\S/, {
    message: 'Display name cannot be blank',
  })
  displayName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;
}
