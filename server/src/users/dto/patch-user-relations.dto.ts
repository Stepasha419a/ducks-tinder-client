import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PatchUserRelationsDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(16)
  interests?: string[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  zodiacSign?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  education?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  childrenAttitude?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  personalityType?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  communicationStyle?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  attentionSign?: string;
}
