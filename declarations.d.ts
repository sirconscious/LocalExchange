// declarations.d.ts

// SVG Files
declare module '*.svg' {
    const content: React.FC<React.SVGProps<SVGSVGElement>>;
    export default content;
  }
  
  // Image Files
  declare module '*.png' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpg' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpeg' {
    const value: string;
    export default value;
  }
  
  declare module '*.gif' {
    const value: string;
    export default value;
  }
  
  declare module '*.webp' {
    const value: string;
    export default value;
  }
  
  // Video Files
  declare module '*.mp4' {
    const value: string;
    export default value;
  }
  
  declare module '*.webm' {
    const value: string;
    export default value;
  }
  
  declare module '*.ogg' {
    const value: string;
    export default value;
  }
  
  // Audio Files
  declare module '*.mp3' {
    const value: string;
    export default value;
  }
  
  declare module '*.wav' {
    const value: string;
    export default value;
  }
  
  declare module '*.flac' {
    const value: string;
    export default value;
  }
  
  declare module '*.aac' {
    const value: string;
    export default value;
  }
  
  // Other Files (e.g., JSON, txt, etc.)
  declare module '*.json' {
    const value: any;
    export default value;
  }
  
  declare module '*.txt' {
    const value: string;
    export default value;
  }
  