import { View, Pressable, Image } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components";
import { UploadIcon, DocumentIcon, ImageIcon, CloseIcon } from "@/assets/icons";
import { BarFill } from "@/components/progressbar/BarFill";

export interface FileItem {
  id: string;
  name: string;
  size?: number;
  type: "image" | "document";
  uri?: string;
}

export interface FileUploadProps {
  // Data
  files?: FileItem[];
  maxFiles?: number;
  uploading?: boolean;
  uploadProgress?: number;

  // Callbacks
  onUploadAreaPress?: () => void;
  onRemoveFile?: (fileId: string) => void;
  onUploadPress?: () => void;

  // Container styles
  containerStyles?: string;

  // Upload Area styles & icons
  uploadAreaContainerStyles?: string;
  uploadAreaActiveStyles?: string;
  uploadAreaDisabledStyles?: string;
  uploadAreaIcon?: React.ReactNode;
  uploadAreaDisabledIcon?: React.ReactNode;
  uploadAreaTitleStyles?: string;
  uploadAreaSubtitleStyles?: string;

  // Progress Bar styles
  progressContainerStyles?: string;
  progressBarStyles?: string;
  progressLabelStyles?: string;

  // Preview Section styles
  previewContainerStyles?: string;
  previewHeaderStyles?: string;
  previewTitleStyles?: string;

  // Upload Button styles
  uploadButtonStyles?: string;
  uploadButtonTextStyles?: string;

  // File Item styles & icons
  fileItemContainerStyles?: string;
  fileItemImageIcon?: React.ReactNode;
  fileItemDocumentIcon?: React.ReactNode;
  fileItemNameStyles?: string;
  fileItemSizeStyles?: string;
  fileItemRemoveButtonStyles?: string;
  fileItemRemoveIcon?: React.ReactNode;

  // Preview Image styles
  previewImageStyles?: string;
  previewImagePlaceholderStyles?: string;
}

export function FileUpload({
  files = [],
  maxFiles = 5,
  uploading = false,
  uploadProgress = 0,
  onUploadAreaPress,
  onRemoveFile,
  onUploadPress,

  containerStyles,
  uploadAreaContainerStyles,
  uploadAreaActiveStyles,
  uploadAreaDisabledStyles,

  uploadAreaIcon,
  uploadAreaDisabledIcon,
  uploadAreaTitleStyles,
  uploadAreaSubtitleStyles,

  progressContainerStyles,
  progressBarStyles,
  progressLabelStyles,
  previewContainerStyles,
  previewHeaderStyles,
  previewTitleStyles,

  uploadButtonStyles,
  uploadButtonTextStyles,

  fileItemContainerStyles,
  fileItemImageIcon,
  fileItemDocumentIcon,
  fileItemNameStyles,
  fileItemSizeStyles,
  fileItemRemoveButtonStyles,
  fileItemRemoveIcon,

  previewImageStyles,
  previewImagePlaceholderStyles,
}: FileUploadProps) {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown size";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isDisabled = uploading || files.length >= maxFiles;

  // Default styles matching the design system
  const defaultUploadAreaActiveStyles = "border-border bg-background";
  const defaultUploadAreaDisabledStyles =
    "border-muted-foreground bg-muted opacity-50";

  // Default icons
  const defaultUploadAreaIcon = (
    <UploadIcon width={24} height={24} color="#000000" />
  );
  const defaultUploadAreaDisabledIcon = (
    <UploadIcon width={24} height={24} color="#999999" />
  );
  const defaultFileItemImageIcon = (
    <ImageIcon width={24} height={24} color="#000000" />
  );
  const defaultFileItemDocumentIcon = (
    <DocumentIcon width={24} height={24} color="#000000" />
  );
  const defaultFileItemRemoveIcon = (
    <CloseIcon width={14} height={14} color="#fff" />
  );

  return (
    <View className={cn("w-full", containerStyles)}>
      {/* Upload Area */}
      <Pressable
        onPress={onUploadAreaPress}
        disabled={isDisabled}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 items-center justify-center mb-4",
          isDisabled
            ? cn(defaultUploadAreaDisabledStyles, uploadAreaDisabledStyles)
            : cn(defaultUploadAreaActiveStyles, uploadAreaActiveStyles),
          uploadAreaContainerStyles,
        )}
      >
        <View className="items-center">
          {isDisabled
            ? uploadAreaDisabledIcon || defaultUploadAreaDisabledIcon
            : uploadAreaIcon || defaultUploadAreaIcon}
          <Text
            className={cn(
              "text-base font-semibold text-foreground mb-1 mt-3",
              uploadAreaTitleStyles,
            )}
          >
            {files.length >= maxFiles
              ? "Maximum files reached"
              : "Tap to select files"}
          </Text>
          <Text
            className={cn(
              "text-sm text-muted-foreground text-center font-medium",
              uploadAreaSubtitleStyles,
            )}
          >
            Images and documents {"\n"}
            Max {maxFiles} files
          </Text>
        </View>
      </Pressable>

      {/* File Preview */}
      {files && files.length > 0 && (
        <View className={cn("gap-3", previewContainerStyles)}>
          <View
            className={cn(
              "flex-row justify-between items-center mb-2",
              previewHeaderStyles,
            )}
          >
            <Text
              className={cn(
                "text-base font-semibold text-foreground",
                previewTitleStyles,
              )}
            >
              {uploading
                ? "Uploading Files"
                : `Selected Files (${files.length})`}
            </Text>
            {!uploading && (
              <Pressable
                onPress={onUploadPress}
                className={cn(
                  "bg-primary px-4 py-2 rounded-lg",
                  uploadButtonStyles,
                )}
              >
                <Text
                  className={cn(
                    "text-primary-foreground font-semibold",
                    uploadButtonTextStyles,
                  )}
                >
                  Upload
                </Text>
              </Pressable>
            )}
          </View>

          {files.map((file) => (
            <View
              key={file.id}
              className={cn(
                "bg-background rounded-lg p-3 border-2 border-border",
                fileItemContainerStyles,
              )}
            >
              {/* Top Row: Icon + File Info + Cancel Button */}
              <View className="flex-row items-center">
                {/* Icon */}
                {file.type === "image" && file.uri ? (
                  <Image
                    source={{ uri: file.uri }}
                    className={cn("w-12 h-12 rounded mr-3", previewImageStyles)}
                    resizeMode="cover"
                  />
                ) : file.type === "image" ? (
                  <View
                    className={cn(
                      "w-12 h-12 rounded mr-3 bg-muted items-center justify-center",
                      previewImagePlaceholderStyles,
                    )}
                  >
                    {fileItemImageIcon || defaultFileItemImageIcon}
                  </View>
                ) : (
                  <View
                    className={cn(
                      "w-12 h-12 rounded mr-3 bg-muted items-center justify-center",
                      previewImagePlaceholderStyles,
                    )}
                  >
                    {fileItemDocumentIcon || defaultFileItemDocumentIcon}
                  </View>
                )}

                {/* File Info */}
                <View className="flex-1">
                  <Text
                    className={cn(
                      "text-sm text-foreground font-bold",
                      fileItemNameStyles,
                    )}
                    numberOfLines={1}
                  >
                    {file.name}
                  </Text>
                  <Text
                    className={cn(
                      "text-xs text-muted-foreground mt-1",
                      fileItemSizeStyles,
                    )}
                  >
                    {formatFileSize(file.size)}
                  </Text>
                </View>

                {/* Cancel/Remove Button */}
                <Pressable
                  onPress={() => onRemoveFile?.(file.id)}
                  className={cn("ml-2 p-1 bg-primary rounded-full", fileItemRemoveButtonStyles)}
                >
                  {fileItemRemoveIcon || defaultFileItemRemoveIcon}
                </Pressable>
              </View>

              {/* Progress Bar (shown when uploading) */}
              {uploading && (
                <View className={cn("mt-3", progressContainerStyles)}>
                  <Text
                    className={cn(
                      "text-xs font-medium text-foreground mb-1",
                      progressLabelStyles,
                    )}
                  >
                    {uploadProgress}%
                  </Text>
                  <BarFill
                    progress={uploadProgress}
                    containerStyles={progressBarStyles}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
