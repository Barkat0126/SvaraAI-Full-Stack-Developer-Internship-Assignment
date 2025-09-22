import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import styles from './Card.module.css';

const Card = forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        styles.card,
        variant !== "default" && styles[variant],
        className
      )}
      {...props}
    />
  );
});
Card.displayName = "Card";

const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles.cardHeader, className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(styles.cardTitle, className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(styles.cardDescription, className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.cardContent, className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles.cardFooter, className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };