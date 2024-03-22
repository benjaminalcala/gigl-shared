import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

export function uploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      { public_id, overwrite, invalidate, resource_type: 'auto' },
      (
        error: UploadApiErrorResponse | undefined,
        response: UploadApiResponse | undefined
      ) => {
        if (error) resolve(error);
        resolve(response);
      }
    );
  });
}

export function videoUpload(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate,
        resource_type: 'video',
        chunk_size: 50000,
      },
      (
        error: UploadApiErrorResponse | undefined,
        response: UploadApiResponse | undefined
      ) => {
        if (error) resolve(error);
        resolve(response);
      }
    );
  });
}
