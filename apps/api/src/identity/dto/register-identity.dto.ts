import { IsString, Length, Matches } from 'class-validator';

export class RegisterIdentityDto {
  @IsString()
  @Length(3, 30)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username may contain only letters, numbers and underscores',
  })
  username!: string;

  @IsString()
  @Length(2, 60)
  @Matches(/\S/, {
    message: 'Display name cannot be blank',
  })
  displayName!: string;
}
