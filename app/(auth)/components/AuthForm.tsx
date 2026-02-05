import { View, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from '@/components/inputs/TextInput';
import { Button, Text } from '@/components';
import { loginSchema, signupSchema, LoginFormData, SignupFormData } from '@/app/(auth)/schemas';

interface LoginAuthFormProps {
  type: 'login';
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

interface SignupAuthFormProps {
  type: 'signup';
  onSubmit: (data: SignupFormData) => void;
  isLoading?: boolean;
}

type AuthFormProps = LoginAuthFormProps | SignupAuthFormProps;

export default function AuthForm({ type, onSubmit, isLoading }: AuthFormProps) {
  const schema = type === 'login' ? loginSchema : signupSchema;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues:
      type === 'login'
        ? { email: '', password: '' }
        : { email: '', password: '', repeatPassword: '' },
  });

  // Login Form
  if (type === 'login') {
    return (
      <View className="gap-4">
        <View>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                type="email"
                label="Email Address"
                placeholder="example@gmail.com"
                value={value}
                onChangeText={onChange}
                borderActiveColor={errors.email ? 'border-destructive' : undefined}
              />
            )}
          />
          {errors.email && (
            <View className="flex-row items-center gap-1 mt-1">
              <View className="w-4 h-4 bg-destructive rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">!</Text>
              </View>
              <Text className="text-destructive text-sm">{errors.email.message}</Text>
            </View>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                type="password"
                label="Password"
                placeholder="********"
                value={value}
                onChangeText={onChange}
                borderActiveColor={errors.password ? 'border-destructive' : undefined}
              />
            )}
          />
          {errors.password && (
            <View className="flex-row items-center gap-1 mt-1">
              <View className="w-4 h-4 bg-destructive rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">!</Text>
              </View>
              <Text className="text-destructive text-sm">{errors.password.message}</Text>
            </View>
          )}

          <Pressable className="mt-2 self-end">
            <Text variant="bodyText2" className="text-foreground font-medium underline">
              Forgot Password?
            </Text>
          </Pressable>
        </View>

        <Button
          variant="primary"
          size="lg"
          title="Login"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          containerStyles="mt-10 mb-6"
        />
      </View>
    );
  }

  // Signup Form
  return (
    <View className="gap-4">
      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              type="email"
              label="Email Address"
              placeholder="example@gmail.com"
              value={value}
              onChangeText={onChange}
              borderActiveColor={errors.email ? 'border-destructive' : undefined}
            />
          )}
        />
        {errors.email && (
          <View className="flex-row items-center gap-1 mt-1">
            <View className="w-4 h-4 bg-destructive rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">!</Text>
            </View>
            <Text className="text-destructive text-sm">{errors.email.message}</Text>
          </View>
        )}
      </View>

      <View>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              type="password"
              label="Password"
              placeholder="********"
              value={value}
              onChangeText={onChange}
              borderActiveColor={errors.password ? 'border-destructive' : undefined}
            />
          )}
        />
        {errors.password && (
          <View className="flex-row items-center gap-1 mt-1">
            <View className="w-4 h-4 bg-destructive rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">!</Text>
            </View>
            <Text className="text-destructive text-sm">{errors.password.message}</Text>
          </View>
        )}
      </View>

      <View>
        <Controller
          control={control}
          name="repeatPassword"
          render={({ field: { onChange, value } }) => (
            <TextInput
              type="password"
              label="Repeat Password"
              placeholder="********"
              value={value}
              onChangeText={onChange}
              borderActiveColor={errors.repeatPassword ? 'border-destructive' : undefined}
            />
          )}
        />
        {errors.repeatPassword && (
          <View className="flex-row items-center gap-1 mt-1">
            <View className="w-4 h-4 bg-destructive rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">!</Text>
            </View>
            <Text className="text-destructive text-sm">{errors.repeatPassword.message}</Text>
          </View>
        )}
      </View>

      <Button
        variant="primary"
        size="lg"
        title="Sign Up"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
        containerStyles="mt-10 mb-6"
      />
    </View>
  );
}
