import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class MatchAgeRange {
  @Prop()
  min?: number;

  @Prop()
  max?: number;
}

export const MatchAgeRangeSchema = SchemaFactory.createForClass(MatchAgeRange);

@Schema({ _id: false })
export class MatchHeightRange {
  @Prop()
  min?: number;

  @Prop()
  max?: number;
}

export const MatchHeightRangeSchema = SchemaFactory.createForClass(MatchHeightRange);

@Schema({ _id: false })
export class MatchWeightRange {
  @Prop()
  min?: number;

  @Prop()
  max?: number;
}

export const MatchWeightRangeSchema = SchemaFactory.createForClass(MatchWeightRange);

@Schema({ _id: false })
export class MatchPreferences {
  @Prop({ type: MatchAgeRangeSchema, default: {} })
  ageRange?: MatchAgeRange;

  // Server-derived from the requesting user's own gender — never trust a
  // client-supplied value here. See MatchingService.normalizePreferences().
  @Prop()
  preferredGender?: string;

  @Prop({ type: MatchHeightRangeSchema, default: {} })
  heightRange?: MatchHeightRange;

  @Prop({ type: MatchWeightRangeSchema, default: {} })
  weightRange?: MatchWeightRange;

  @Prop({ type: [String], default: [] })
  preferredBodyTypes?: string[];

  @Prop({ type: [String], default: [] })
  preferredSkinColors?: string[];

  // Tri-state ('yes'/'no'/'no_preference'), not an array — a beard
  // preference doesn't have multiple simultaneous values.
  @Prop()
  preferredHasBeard?: string;

  @Prop({ type: [String], default: [] })
  preferredHairTypes?: string[];

  @Prop({ type: [String], default: [] })
  preferredHairColors?: string[];

  @Prop({ type: [String], default: [] })
  preferredNetWorths?: string[];

  // Tri-state ('yes'/'no'/'no_preference'), same shape as preferredHasBeard.
  @Prop()
  preferredVehicleOwnership?: string;

  // "At most N siblings" — a cutoff, not a range.
  @Prop()
  preferredMaxSiblings?: number;

  @Prop({ type: [String], default: [] })
  preferredDistricts?: string[];

  @Prop({ type: [String], default: [] })
  preferredProvinces?: string[];

  @Prop({ type: [String], default: [] })
  preferredCities?: string[];

  @Prop({ type: [String], default: [] })
  preferredReligions?: string[];

  @Prop({ type: [String], default: [] })
  preferredCastes?: string[];

  @Prop({ type: [String], default: [] })
  preferredEducationKeywords?: string[];

  @Prop({ type: [String], default: [] })
  preferredOccupationKeywords?: string[];

  @Prop({ type: [String], default: [] })
  preferredInterests?: string[];

  @Prop({ type: [String], default: [] })
  preferredHobbies?: string[];

  @Prop({ type: [String], default: [] })
  preferredMaritalStatuses?: string[];

  @Prop({ type: [String], default: [] })
  dealBreakers?: string[];

  @Prop()
  updatedAt?: Date;
}

export const MatchPreferencesSchema =
  SchemaFactory.createForClass(MatchPreferences);

// Keep user ids consistent with `mrkapu-auth-service`/`mrkapu-user-service`
// by using the same Mongo collection (`auth_users`).
@Schema({ collection: 'auth_users', timestamps: true })
export class User {
  @Prop({ sparse: true })
  email?: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  dob?: string;

  @Prop()
  age?: number;

  // Needed to server-derive preferredGender — see
  // MatchingService.normalizePreferences(). Never client-editable here.
  @Prop()
  gender?: string;

  @Prop()
  city?: string;

  @Prop()
  province?: string;

  @Prop()
  location?: string;

  @Prop()
  religion?: string;

  @Prop()
  caste?: string;

  @Prop()
  education?: string;

  @Prop()
  occupation?: string;

  @Prop()
  job?: string;

  @Prop()
  monthlyIncomeRange?: string;

  @Prop()
  maritalStatus?: string;

  // Physical/lifestyle attributes — declared here so they survive Mongoose's
  // default strict-schema read filtering. They already exist on the
  // underlying auth_users document (written by mrkapu-user-service) but
  // were never declared on this service's own shadow User class before, so
  // every read here silently dropped them.
  @Prop()
  height?: number;

  @Prop()
  weight?: number;

  @Prop()
  skinColor?: string;

  @Prop()
  hairType?: string;

  @Prop()
  bodyType?: string;

  @Prop()
  hasBeard?: boolean;

  @Prop()
  hairColor?: string;

  @Prop()
  district?: string;

  @Prop()
  siblingsCount?: number;

  @Prop()
  netWorth?: string;

  @Prop()
  vehicleType?: string;

  @Prop()
  numberOfVehicles?: number;

  @Prop()
  avatarUrl?: string;

  @Prop()
  role?: string;

  @Prop()
  provider?: string;

  @Prop({ type: [String], default: [] })
  interests?: string[];

  @Prop({ type: [String], default: [] })
  hobbies?: string[];

  @Prop({ type: [String], default: [] })
  sports?: string[];

  @Prop({ type: [String], default: [] })
  favoritePlaces?: string[];

  @Prop({ type: [String], default: [] })
  serviceCategories?: string[];

  @Prop({ type: [String], default: [] })
  followingIds?: string[];

  @Prop({ default: false })
  verifiedPhoneNumber?: boolean;

  @Prop({ default: false })
  verifiedEmail?: boolean;

  @Prop({ default: false })
  isProfileVerified?: boolean;

  @Prop({ default: false })
  isBot?: boolean;

  @Prop({ default: 0 })
  profileCompletion?: number;

  // Set true by MatchingService.updatePreferences() on the first successful
  // save — onboarding or a later edit. Used to avoid re-prompting at signup.
  @Prop({ default: false })
  partnerPreferencesCompleted?: boolean;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  matchPreferences?: MatchPreferences | Record<string, unknown>;

  createdAt?: Date;
  updatedAt?: Date;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
