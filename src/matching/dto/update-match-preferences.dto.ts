import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

// Duplicated literals — no shared package between these independently
// deployed services, matching how RELIGIONS/CASTES are already duplicated
// elsewhere in this codebase (e.g. auth-service's complete-profile.dto.ts).
export const BODY_TYPES = ['slim', 'athletic', 'average', 'heavy'] as const;
export const HAIR_COLORS = ['black', 'brown', 'dark_brown', 'grey', 'other'] as const;
export const NET_WORTH_BUCKETS = ['under_1m', '1m_5m', '5m_10m', '10m_25m', '25m_plus'] as const;
export const SL_DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
  'Vavuniya', 'Mullaitivu', 'Trincomalee', 'Batticaloa', 'Ampara',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
  'Monaragala', 'Ratnapura', 'Kegalle',
] as const;
const TRI_STATE = ['yes', 'no', 'no_preference'] as const;

export class UpdateMatchPreferencesDto {
  @IsOptional()
  @IsInt()
  @Min(18)
  @Max(90)
  minAge?: number;

  @IsOptional()
  @IsInt()
  @Min(18)
  @Max(90)
  maxAge?: number;

  // Accepted but ignored server-side if the caller isn't allowed to set it —
  // MatchingService.normalizePreferences() always derives the real value
  // from the caller's own gender. Present here only so GET round-trips it.
  @IsOptional()
  @IsString()
  @IsIn(['male', 'female'])
  preferredGender?: string;

  @IsOptional()
  @IsInt()
  @Min(100)
  @Max(250)
  preferredHeightMin?: number;

  @IsOptional()
  @IsInt()
  @Min(100)
  @Max(250)
  preferredHeightMax?: number;

  @IsOptional()
  @IsInt()
  @Min(30)
  @Max(200)
  preferredWeightMin?: number;

  @IsOptional()
  @IsInt()
  @Min(30)
  @Max(200)
  preferredWeightMax?: number;

  @IsOptional()
  @IsArray()
  @IsIn(BODY_TYPES, { each: true })
  preferredBodyTypes?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredSkinColors?: string[];

  @IsOptional()
  @IsString()
  @IsIn(TRI_STATE)
  preferredHasBeard?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredHairTypes?: string[];

  @IsOptional()
  @IsArray()
  @IsIn(HAIR_COLORS, { each: true })
  preferredHairColors?: string[];

  @IsOptional()
  @IsArray()
  @IsIn(NET_WORTH_BUCKETS, { each: true })
  preferredNetWorths?: string[];

  @IsOptional()
  @IsString()
  @IsIn(TRI_STATE)
  preferredVehicleOwnership?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(20)
  preferredMaxSiblings?: number;

  @IsOptional()
  @IsArray()
  @IsIn(SL_DISTRICTS, { each: true })
  preferredDistricts?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredProvinces?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredCities?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredReligions?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredCastes?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredEducationKeywords?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredOccupationKeywords?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredInterests?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredHobbies?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredMaritalStatuses?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dealBreakers?: string[];
}
