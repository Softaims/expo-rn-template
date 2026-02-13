import { CloseIcon, DocumentIcon, UploadIcon } from "@/assets/icons";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import { Pressable, View } from "react-native";

export interface FileItem {
  id: string;
  name: string;
  size?: number;
  type: "image" | "document";
  uri?: string;
  uploadProgress?: number; // If set, file is uploading
}

export interface FileUploadProps {
  // Data
  files?: FileItem[];

  // Callbacks
  onUploadAreaPress?: () => void;
  onRemoveFile?: (fileId: string) => void;

  // Container styles
  containerStyles?: string;

  // Upload Area content & styles
  uploadAreaTitle?: string;
  uploadAreaSubtitle?: string;
  uploadAreaStyles?: string;
  uploadAreaIcon?: React.ReactNode;
  uploadAreaTitleStyles?: string;
  uploadAreaSubtitleStyles?: string;

  // File Item styles
  fileItemContainerStyles?: string;
  fileItemIconStyles?: string;
  fileItemTextStyles?: string;
  fileItemSubtextStyles?: string;
  fileItemRemoveButtonStyles?: string;
  progressBarStyles?: string;

  // Icons
  documentIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
}

export function FileUpload({
  files = [],
  onUploadAreaPress,
  onRemoveFile,

  containerStyles,
  uploadAreaTitle = "Tap to select file",
  uploadAreaSubtitle = "Max file size 5MB allowed",
  uploadAreaStyles,
  uploadAreaIcon,
  uploadAreaTitleStyles,
  uploadAreaSubtitleStyles,

  fileItemContainerStyles,
  fileItemIconStyles,
  fileItemTextStyles,
  fileItemSubtextStyles,
  fileItemRemoveButtonStyles,
  progressBarStyles,

  documentIcon,
  removeIcon,
}: FileUploadProps) {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "0 Kb";
    const kb = bytes / 1024;
    if (kb < 1024) return `${Math.round(kb)}Kb`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)}Mb`;
  };

  const isDisabled = files.length > 0;

  // Default icons
  const defaultUploadAreaIcon = (
    <UploadIcon width={24} height={16} color="#000000" />
  );
  const defaultDocumentIcon = (
    <DocumentIcon width={24} height={24} color="#000" />
  );
  const defaultRemoveIcon = <CloseIcon width={11} height={11} color="#fff" />;

  return (
    <View className={cn("w-full", containerStyles)}>
      {/* Upload Area */}
      <Pressable
        onPress={onUploadAreaPress}
        disabled={isDisabled}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 items-center justify-center mb-4 border-border bg-background",
          uploadAreaStyles,
        )}
      >
        <View className="items-center">
          {uploadAreaIcon || defaultUploadAreaIcon}
          <Text
            className={cn(
              "text-base font-semibold text-foreground mb-1 mt-3",
              uploadAreaTitleStyles,
            )}
          >
            {uploadAreaTitle}
          </Text>
          <Text
            className={cn(
              "text-sm text-muted-foreground text-center font-medium",
              uploadAreaSubtitleStyles,
            )}
          >
            {uploadAreaSubtitle}
          </Text>
        </View>
      </Pressable>

      {/* File Preview */}
      {files && files.length > 0 && (
        <View className="gap-3">
          {files.map((file) => {
            const isUploading = file.uploadProgress !== undefined;

            return (
              <View
                key={file.id}
                className={cn(
                  "bg-muted rounded-xl p-4",
                  fileItemContainerStyles,
                )}
              >
                <View className="flex-row items-start">
                  {/* Icon */}
                  <View
                    className={cn(
                      "w-12 h-12 rounded-lg items-center justify-center mr-3",
                      fileItemIconStyles,
                    )}
                  >
                    {documentIcon || defaultDocumentIcon}
                  </View>

                  {/* File Info */}
                  <View className="flex-1">
                    {isUploading ? (
                      <>
                        {/* Uploading State */}
                        <Text
                          className={cn(
                            "text-base font-semibold text-foreground",
                            fileItemTextStyles,
                          )}
                        >
                          Uploading...
                        </Text>
                        <Text
                          className={cn(
                            "text-sm text-muted-foreground mt-0.5",
                            fileItemSubtextStyles,
                          )}
                          numberOfLines={1}
                        >
                          {file.name}
                        </Text>
                      </>
                    ) : (
                      <>
                        {/* Uploaded State */}
                        <Text
                          className={cn(
                            "text-base font-semibold text-foreground",
                            fileItemTextStyles,
                          )}
                          numberOfLines={1}
                        >
                          {file.name}
                        </Text>
                        <Text
                          className={cn(
                            "text-sm text-muted-foreground mt-0.5",
                            fileItemSubtextStyles,
                          )}
                        >
                          {formatFileSize(file.size)}
                        </Text>
                      </>
                    )}
                  </View>

                  {/* Remove Button */}
                  <Pressable
                    onPress={() => onRemoveFile?.(file.id)}
                    className={cn(
                      "w-5 h-5 bg-foreground rounded-full items-center justify-center ml-2",
                      fileItemRemoveButtonStyles,
                    )}
                  >
                    {removeIcon || defaultRemoveIcon}
                  </Pressable>
                </View>

                {/* Progress Bar (shown when uploading) */}
                {isUploading && (
                  <View className="mt-3">
                    <BarFill
                      progress={file.uploadProgress || 0}
                      containerStyles={progressBarStyles}
                      inactiveStyle="bg-gray-300"
                    />
                    <View className="flex-row items-center justify-between mt-2">
                      <Text className="text-xs text-muted-foreground">
                        {file.uploadProgress}%
                      </Text>
                      <Text className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
