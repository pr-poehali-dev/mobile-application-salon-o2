import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const categories = [
  { id: 'all', name: 'Все', icon: 'Grid3x3' },
  { id: 'phones', name: 'Смартфоны', icon: 'Smartphone' },
  { id: 'tablets', name: 'Планшеты', icon: 'Tablet' },
  { id: 'watches', name: 'Часы', icon: 'Watch' },
  { id: 'accessories', name: 'Аксессуары', icon: 'Headphones' },
];

const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 129990,
    oldPrice: 149990,
    image: 'https://images.unsplash.com/photo-1696446702792-da87e32a5f0b?w=400',
    category: 'phones',
    rating: 4.9,
    reviews: 342,
    inStock: true,
    badge: 'ХИТ'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    price: 119990,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    category: 'phones',
    rating: 4.8,
    reviews: 256,
    inStock: true,
    badge: 'НОВИНКА'
  },
  {
    id: 3,
    name: 'iPad Pro 12.9"',
    price: 109990,
    oldPrice: 119990,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    category: 'tablets',
    rating: 4.9,
    reviews: 189,
    inStock: true,
    badge: '-10%'
  },
  {
    id: 4,
    name: 'Apple Watch Series 9',
    price: 44990,
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400',
    category: 'watches',
    rating: 4.7,
    reviews: 423,
    inStock: true
  },
  {
    id: 5,
    name: 'AirPods Pro 2',
    price: 24990,
    oldPrice: 29990,
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400',
    category: 'accessories',
    rating: 4.8,
    reviews: 567,
    inStock: true,
    badge: '-17%'
  },
  {
    id: 6,
    name: 'Xiaomi 14 Pro',
    price: 79990,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
    category: 'phones',
    rating: 4.6,
    reviews: 134,
    inStock: true
  },
];

const promos = [
  { id: 1, title: 'Скидка 20% на смартфоны', description: 'При покупке от 2 устройств', gradient: 'from-purple-500 to-pink-500' },
  { id: 2, title: 'Trade-in +15%', description: 'Сдай старый телефон выгодно', gradient: 'from-blue-500 to-cyan-500' },
  { id: 3, title: 'Рассрочка 0%', description: 'До 24 месяцев без переплаты', gradient: 'from-orange-500 to-red-500' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('home');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              О2
            </h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" className="h-5 w-5" />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingCart" className="h-5 w-5" />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg" side="right">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <Icon name="ShoppingBag" className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                          {cart.map(item => (
                            <Card key={item.id}>
                              <CardContent className="p-4">
                                <div className="flex gap-4">
                                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                  <div className="flex-1">
                                    <h3 className="font-semibold mb-1">{item.name}</h3>
                                    <p className="text-lg font-bold text-primary">{item.price.toLocaleString()} ₽</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, -1)}>
                                        <Icon name="Minus" className="h-4 w-4" />
                                      </Button>
                                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                      <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, 1)}>
                                        <Icon name="Plus" className="h-4 w-4" />
                                      </Button>
                                      <Button size="icon" variant="ghost" className="h-8 w-8 ml-auto" onClick={() => removeFromCart(item.id)}>
                                        <Icon name="Trash2" className="h-4 w-4 text-destructive" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <div className="border-t pt-4 space-y-4">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Итого:</span>
                            <span className="text-primary">{cartTotal.toLocaleString()} ₽</span>
                          </div>
                          <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-secondary to-primary hover:opacity-90">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Поиск товаров..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
          <TabsContent value="home" className="mt-6 space-y-6">
            <div className="grid gap-4">
              {promos.map(promo => (
                <Card key={promo.id} className="overflow-hidden animate-fade-in">
                  <div className={`bg-gradient-to-r ${promo.gradient} p-6 text-white`}>
                    <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                    <p className="opacity-90">{promo.description}</p>
                  </div>
                </Card>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Категории</h2>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(cat => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? 'default' : 'outline'}
                    className={`flex-shrink-0 ${selectedCategory === cat.id ? 'bg-gradient-to-r from-secondary to-primary' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <Icon name={cat.icon as any} className="h-4 w-4 mr-2" />
                    {cat.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Товары</h2>
              <div className="grid grid-cols-2 gap-4">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in">
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                      {product.badge && (
                        <Badge className="absolute top-2 right-2 bg-accent">{product.badge}</Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Icon name="Star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <p className="text-lg font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                        {product.oldPrice && (
                          <p className="text-sm text-muted-foreground line-through">{product.oldPrice.toLocaleString()} ₽</p>
                        )}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90" onClick={() => addToCart(product)}>
                        <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                        В корзину
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="catalog" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Каталог</h2>
            <div className="grid gap-4">
              {categories.filter(c => c.id !== 'all').map(cat => (
                <Card key={cat.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon name={cat.icon as any} className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{cat.name}</h3>
                    <Icon name="ChevronRight" className="h-5 w-5 ml-auto" />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="mt-6 space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-white text-2xl font-bold">
                  А
                </div>
                <div>
                  <h2 className="text-xl font-bold">Александр</h2>
                  <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Package" className="h-5 w-5 mr-3" />
                  Мои заказы
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Heart" className="h-5 w-5 mr-3" />
                  Избранное
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="MapPin" className="h-5 w-5 mr-3" />
                  Адреса доставки
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="CreditCard" className="h-5 w-5 mr-3" />
                  Способы оплаты
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Settings" className="h-5 w-5 mr-3" />
                  Настройки
                </Button>
              </div>
            </Card>
          </TabsContent>
      </div>

      <TabsList className="fixed bottom-0 left-0 right-0 h-16 rounded-none border-t bg-white grid grid-cols-3">
        <TabsTrigger value="home" className="flex flex-col gap-1">
          <Icon name="Home" className="h-5 w-5" />
          <span className="text-xs">Главная</span>
        </TabsTrigger>
        <TabsTrigger value="catalog" className="flex flex-col gap-1">
          <Icon name="Grid3x3" className="h-5 w-5" />
          <span className="text-xs">Каталог</span>
        </TabsTrigger>
        <TabsTrigger value="profile" className="flex flex-col gap-1">
          <Icon name="User" className="h-5 w-5" />
          <span className="text-xs">Профиль</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default Index;