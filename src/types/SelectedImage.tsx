export interface SelectedImage {
    uri: string;
    blob: Blob;
    name?: string;
    type: "image" | "video" | undefined;
  }
  