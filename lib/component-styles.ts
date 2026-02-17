import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { cn } from './utils';

/**
 * Generic type for component element styles
 */
export type ElementStyle = ViewStyle | TextStyle | ImageStyle;

/**
 * Type for style overrides that can be applied to component sub-elements
 * @template T - Union type of valid element keys for the component
 */
export type StyleOverrides<T extends string> = {
  /**
   * Object mapping element keys to Tailwind/NativeWind class strings
   * These classes will be merged with the component's base classes
   */
  classes?: Partial<Record<T, string>>;

  /**
   * Object mapping element keys to React Native inline styles
   * These styles will be applied after classes
   */
  styles?: Partial<Record<T, ElementStyle>>;
};

/**
 * Helper function to merge base classes with user-provided class overrides
 * Priority order: baseClasses < override (last wins)
 *
 * @param baseClasses - Component's default classes
 * @param override - User-provided class override from classes prop
 * @returns Merged class string
 */
export function mergeClasses(baseClasses: string, override?: string): string {
  return cn(baseClasses, override);
}

/**
 * Universal helper to get inline style for any element type
 * Works for View, Text, and Animated components
 *
 * @param styles - Styles object from component props
 * @param element - Element key to get style for
 * @returns Style object or undefined (properly typed for StyleProp)
 */
export function getElementStyle<T extends string>(
  styles: Partial<Record<T, ElementStyle>> | undefined,
  element: T
): ElementStyle | undefined {
  return styles?.[element];
}

/**
 * Helper function to get inline TextStyle for a text element
 * Type-safe version that returns TextStyle specifically
 *
 * @param styles - Styles object from component props
 * @param element - Element key to get style for
 * @returns TextStyle object or undefined
 */
export function getElementTextStyle<T extends string>(
  styles: Record<string, any> | undefined,
  element: T
): TextStyle | undefined {
  return styles?.[element] as TextStyle | undefined;
}

/**
 * Helper function to get classes for an element
 * Merges base classes with user overrides
 *
 * @param classes - Classes object from component props
 * @param element - Element key to get classes for
 * @param baseClasses - Component's default classes for this element
 * @returns Merged class string
 */
export function getElementClasses<T extends string>(
  classes: Partial<Record<T, string>> | undefined,
  element: T,
  baseClasses: string
): string {
  return mergeClasses(baseClasses, classes?.[element]);
}

/**
 * Create a type-safe helper for a specific component's elements
 * Reduces boilerplate and ensures consistency
 *
 * @example
 * const buttonStyleHelper = createStyleHelper<'container' | 'text' | 'icon'>();
 *
 * // In component
 * <View
 *   className={buttonStyleHelper.getClasses(classes, 'container', baseClasses)}
 *   style={buttonStyleHelper.getStyle(styles, 'container')}
 * />
 */
export function createStyleHelper<T extends string>() {
  return {
    getClasses: (
      classes: Partial<Record<T, string>> | undefined,
      element: T,
      baseClasses: string
    ) => getElementClasses(classes, element, baseClasses),

    getStyle: (
      styles: Partial<Record<T, ElementStyle>> | undefined,
      element: T
    ) => getElementStyle(styles, element),
  };
}

/**
 * Utility type to create style props interface for a component
 * Reduces repetitive type definitions
 *
 * @template Elements - Union type of element keys
 * @template ViewElements - Subset that use ViewStyle (optional, defaults to all)
 * @template TextElements - Subset that use TextStyle (optional)
 *
 * @example
 * type ButtonElements = 'container' | 'text' | 'iconWrapper';
 * interface ButtonProps extends ComponentStyleProps<ButtonElements> {
 *   title: string;
 *   // ... other props
 * }
 */
export type ComponentStyleProps<T extends string> = {
  className?: string;
  style?: ViewStyle;
  classes?: Partial<Record<T, string>>;
  styles?: Partial<Record<T, ElementStyle>>;
};

/**
 * Type-safe version with explicit View/Text style separation
 * Use this when you need strict type checking between ViewStyle and TextStyle
 */
export type StrictComponentStyleProps<
  TView extends string,
  TText extends string = never
> = {
  className?: string;
  style?: ViewStyle;
  classes?: Partial<Record<TView | TText, string>>;
  styles?: Partial<{
    [K in TView]: ViewStyle;
  }> &
    Partial<{
      [K in TText]: TextStyle;
    }>;
};
