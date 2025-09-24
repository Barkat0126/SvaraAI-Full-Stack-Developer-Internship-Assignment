// Next.js 15 Performance Optimizations
// This file contains performance utilities and configurations

// Cache configuration for API calls
export const cacheConfig = {
  // Revalidate every 60 seconds for dynamic data
  revalidate: 60,
  
  // Cache tags for granular invalidation
  tags: ['tasks', 'projects', 'dashboard'],
  
  // Fetch cache options
  fetchCache: 'default-cache',
  
  // Runtime cache for client-side
  runtime: 'nodejs',
};

// Performance monitoring utilities
export class PerformanceMonitor {
  static startTiming(label) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${label}-start`);
    }
  }

  static endTiming(label) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${label}-end`);
      window.performance.measure(label, `${label}-start`, `${label}-end`);
      
      const measure = window.performance.getEntriesByName(label)[0];
      console.log(`${label}: ${measure.duration.toFixed(2)}ms`);
      
      // Clean up marks
      window.performance.clearMarks(`${label}-start`);
      window.performance.clearMarks(`${label}-end`);
      window.performance.clearMeasures(label);
    }
  }

  static measureComponent(WrappedComponent, componentName) {
    return function MeasuredComponent(props) {
      React.useEffect(() => {
        PerformanceMonitor.startTiming(`${componentName}-render`);
        return () => {
          PerformanceMonitor.endTiming(`${componentName}-render`);
        };
      }, []);

      return React.createElement(WrappedComponent, props);
    };
  }
}

// Image optimization utilities
export const imageConfig = {
  // Optimized image sizes for different breakpoints
  sizes: {
    mobile: '(max-width: 768px) 100vw',
    tablet: '(max-width: 1024px) 50vw',
    desktop: '33vw',
  },
  
  // Priority loading for above-the-fold images
  priority: true,
  
  // Modern formats
  formats: ['image/avif', 'image/webp'],
  
  // Quality settings
  quality: {
    high: 90,
    medium: 75,
    low: 60,
  },
};

// Bundle optimization utilities
export const bundleOptimization = {
  // Dynamic imports for code splitting
  loadComponent: (importFn) => {
    return React.lazy(() => importFn());
  },
  
  // Preload critical resources
  preloadResource: (href, as = 'script') => {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    }
  },
  
  // Prefetch next page resources
  prefetchPage: (href) => {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    }
  },
};

// Memory optimization utilities
export const memoryOptimization = {
  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Throttle function for scroll events
  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Cleanup function for event listeners
  cleanup: (element, event, handler) => {
    return () => {
      if (element && element.removeEventListener) {
        element.removeEventListener(event, handler);
      }
    };
  },
};

// API optimization utilities
export const apiOptimization = {
  // Request deduplication
  requestCache: new Map(),
  
  // Deduplicated fetch
  fetch: async (url, options = {}) => {
    const key = `${url}-${JSON.stringify(options)}`;
    
    if (apiOptimization.requestCache.has(key)) {
      return apiOptimization.requestCache.get(key);
    }
    
    const promise = fetch(url, {
      ...options,
      // Add cache headers for Next.js 15
      next: {
        revalidate: cacheConfig.revalidate,
        tags: cacheConfig.tags,
      },
    });
    
    apiOptimization.requestCache.set(key, promise);
    
    // Clean up cache after request completes
    promise.finally(() => {
      setTimeout(() => {
        apiOptimization.requestCache.delete(key);
      }, 5000);
    });
    
    return promise;
  },
  
  // Batch API requests
  batchRequests: (requests) => {
    return Promise.allSettled(requests);
  },
};

// React optimization hooks
export const useOptimizedCallback = (callback, deps) => {
  return React.useCallback(callback, deps);
};

export const useOptimizedMemo = (factory, deps) => {
  return React.useMemo(factory, deps);
};

// Intersection Observer for lazy loading
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [element, setElement] = React.useState(null);

  React.useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, options]);

  return [setElement, isIntersecting];
};

// Export all optimizations
export default {
  cacheConfig,
  PerformanceMonitor,
  imageConfig,
  bundleOptimization,
  memoryOptimization,
  apiOptimization,
  useOptimizedCallback,
  useOptimizedMemo,
  useIntersectionObserver,
};