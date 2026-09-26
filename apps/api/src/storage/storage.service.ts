import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {
  private readonly client: SupabaseClient;
  private readonly bucket: string;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY;
    const bucket = process.env.SUPABASE_STORAGE_BUCKET;

    if (!url || !secretKey || !bucket) {
      throw new Error('Supabase Storage environment variables are missing');
    }

    this.client = createClient(url, secretKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    this.bucket = bucket;
  }

  async upload(
    key: string,
    file: Buffer,
    contentType: string,
  ): Promise<string> {
    const { error } = await this.client.storage
      .from(this.bucket)
      .upload(key, file, {
        contentType,
        upsert: false,
      });

    if (error) {
      console.error('Supabase Storage upload failed:', {
        message: error.message,
        statusCode: 'statusCode' in error ? error.statusCode : undefined,
      });

      throw new InternalServerErrorException('Could not upload image');
    }

    return key;
  }

  async remove(key: string): Promise<void> {
    const { error } = await this.client.storage.from(this.bucket).remove([key]);

    if (error) {
      throw new InternalServerErrorException('Could not remove image');
    }
  }

  getPublicUrl(key: string): string {
    const { data } = this.client.storage.from(this.bucket).getPublicUrl(key);

    return data.publicUrl;
  }
}
