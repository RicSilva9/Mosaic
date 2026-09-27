import {
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreatePromptDto {
  @IsString()
  @Length(3, 120)
  @Matches(/\S/, {
    message: 'Title cannot be blank',
  })
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsString()
  @Length(1, 20000)
  @Matches(/\S/, {
    message: 'Prompt content cannot be blank',
  })
  content!: string;
}
