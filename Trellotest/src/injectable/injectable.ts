export function Injectable(): ClassDecorator {
  return (target: any) => {
    // Decorator không làm gì ngoài việc giúp TypeScript emit metadata
  };
}
