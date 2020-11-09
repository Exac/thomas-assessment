import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ApiResponse as IApiResponse,
  List,
} from '../entities/weather.entities';

class ApiResponse implements IApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
}

export type OwnCacheDocument = OwmCache & Document;

@Schema({ timestamps: true })
export class OwmCache {
  @Prop({ unique: true }) uri: string;
  @Prop() response: ApiResponse;
}

export const OwmCacheSchema = SchemaFactory.createForClass(OwmCache);

OwmCacheSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });
