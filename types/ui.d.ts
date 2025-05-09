import { LucideProps } from 'lucide-react';
import { ButtonProps } from '@/components/ui/button';
import { InputProps } from '@/components/ui/input';
import { BadgeProps } from '@/components/ui/badge';
import { AvatarProps } from '@/components/ui/avatar';
import { TabsContentProps } from '@/components/ui/tabs';
import { JSX as ReactJSX } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string;
  }

  interface FormEvent<T> extends SyntheticEvent<T> {
    preventDefault(): void;
  }

  interface ChangeEvent<T> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }
}

declare module 'lucide-react' {
  interface LucideProps {
    className?: string;
  }
}

declare module '@/components/ui/button' {
  interface ButtonProps {
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
  }
}

declare module '@/components/ui/input' {
  interface InputProps {
    className?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
  }
}

declare module '@/components/ui/badge' {
  interface BadgeProps {
    className?: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }
}

declare module '@/components/ui/avatar' {
  interface AvatarProps {
    className?: string;
  }

  interface AvatarImageProps {
    src?: string;
  }
}

declare module '@/components/ui/tabs' {
  interface TabsContentProps {
    className?: string;
    value?: string;
  }
} 