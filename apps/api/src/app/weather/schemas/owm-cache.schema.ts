import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { openweathermap } from '../entities/weather.entities';

export type OwnCacheDocument = OwmCache & Document;

@Schema({ timestamps: true })
export class OwmCache {
  @Prop({ unique: true }) uri: string;
  @Prop() response: openweathermap.ApiResponse;
}

export const OwmCacheSchema = SchemaFactory.createForClass(OwmCache);

OwmCacheSchema.index({ createdAt: 1 }, { expires: '1m' });
