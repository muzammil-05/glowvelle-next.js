export function unsplashImage(id: string, width: number, height: number) {
  return `https://images.unsplash.com/${id}?w=${width}&h=${height}&fit=crop&auto=format&q=80`;
}
