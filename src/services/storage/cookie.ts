interface CookieOptions {
  expires?: Date | number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

class CookieStorage {
  /**
   * Set a cookie with the given name, value, and options
   */
  static set(name: string, value: string, options: CookieOptions = {}): void {
    let cookieString = `${name}=${value}`;

    if (options.expires) {
      const expires = options.expires instanceof Date ? options.expires : new Date(options.expires);
      cookieString += `; expires=${expires.toUTCString()}`;
    }

    if (options.path) cookieString += `; path=${options.path}`;
    if (options.domain) cookieString += `; domain=${options.domain}`;
    if (options.secure) cookieString += '; secure';
    if (options.sameSite) cookieString += `; samesite=${options.sameSite}`;

    document.cookie = cookieString;
  }

  /**
   * Get a cookie value by name
   */
  static get(name: string): string | null {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(c => c.trim().startsWith(`${encodeURIComponent(name)}=`));
    
    if (!cookie) return null;
    
    return decodeURIComponent(cookie.split('=')[1].trim());
  }

  /**
   * Remove a cookie by name
   */
  static remove(name: string, options: CookieOptions = {}): void {
    this.set(name, '', {
      ...options,
      expires: new Date(0)
    });
  }

  /**
   * Check if a cookie exists
   */
  static has(name: string): boolean {
    return this.get(name) !== null;
  }

  /**
   * Get all cookies as an object
   */
  static getAll(): Record<string, string> {
    const cookies: Record<string, string> = {};
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    });
    return cookies;
  }

  /**
   * Set the language translation cookie in the format "{from_lang}/{to_lang}"
   */
  static setTranslationPair(fromLang: string, toLang: string): void {
    this.set('jigsawtrans', `${fromLang}/${toLang}`, {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      path: '/',
      sameSite: 'lax'
    });
  }

  /**
   * Get the current translation language pair
   * @returns Object containing fromLang and toLang, or null if not set
   */
  static getTranslationPair(): { fromLang: string; toLang: string } | null {
    const value = this.get('jigsawtrans');
    if (!value) return null;

    const [fromLang, toLang] = value.split('/');
    if (!fromLang || !toLang) return null;

    return { fromLang, toLang };
  }
}

export default CookieStorage;