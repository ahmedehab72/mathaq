# MATHAQ, خطة التنفيذ والتصميم

## الهدف

تحويل MATHAQ من Design Preview إلى متجر قهوة احترافي، هادئ وفاخر، مع تجربة مختلفة لكل صفحة، تفاصيل واضحة، وحركة محسوبة بدون عشوائية.

التنفيذ سيكون على مرحلتين:

1. Design-first: بناء كل الصفحات والمكونات ببيانات تجريبية قبل ربط أي Backend.
2. Backend-first: ربط Supabase بالـ Auth والمنتجات والـ variants والطلبات والصلاحيات.

## قواعد التصميم

- كل صفحة لها Art Direction خاص بها، مع الحفاظ على نفس هوية MATHAQ.
- استخدام خلفيات غير بيضاء أو سوداء تماماً، وألوان مستوحاة من القهوة والخشب والنحاس.
- إضافة animation هادئ لكل صفحة، مع احترام `prefers-reduced-motion`.
- الحركة تخدم المحتوى ولا تكون مجرد decoration.
- صفحات الـ Auth نظيفة ومركزة، صفحات المتجر حسية، صفحات الحساب عملية، وصفحات الأدمن واضحة وسريعة.
- استخدام skill `10k-websites` كمرجع للـ cinematic hero والـ scroll motion.
- أي صورة أو فيديو جديد للهوية السينمائية يتم توليده عبر Higgsfield بعد تفعيل الـ connector واعتماد الـ concept.
- لا يتم استخدام asset عشوائي قبل تحديد دوره، مكانه، وأسلوب الحركة الخاص به.

## المرحلة 0، تجهيز المشروع

- [ ] التأكد من عمل Node.js و`ffmpeg` بعد إعادة فتح Terminal.
- [ ] تفعيل Higgsfield connector والتحقق من الأدوات والـ credits.
- [ ] مراجعة الـ routes الحالية والـ shared layout.
- [ ] تشغيل `npm run lint` و`npm run build` وتسجيل أي مشاكل قبل التغيير.
- [ ] اعتماد Design Direction موحد للمشروع، palette، fonts، motion language، وhero concept.

## المرحلة 1، صفحات العميل، Design-first

### Auth

- [x] `/login`: دخول العميل، validation، loading، error، success كواجهة Design Preview.
- [x] `/register`: إنشاء حساب عميل فقط كواجهة Design Preview.
- [x] `/forgot-password`: طلب reset email كواجهة Design Preview.
- [x] `/reset-password`: تعيين كلمة مرور جديدة كواجهة Design Preview.
- [x] `/admin/login`: شاشة دخول الأدمن منفصلة بصرياً ووظيفياً كواجهة Design Preview.

### Shopping

- [x] `/search`: بحث بالاسم والوصف وملاحظات التذوق، مع empty state كواجهة Design Preview.
- [x] `/wishlist`: المنتجات المفضلة، مع empty state وحذف وإضافة للسلة كواجهة Design Preview.
- [x] تطوير Product Card ليشمل favorite action.
- [x] تطوير `/shop/[slug]` لعرض اختيار الحجم والطحن كسلسلة variants كواجهة Design Preview.
- [x] إضافة حالات available، low stock، out of stock كواجهة Design Preview.

### Checkout وOrders

- [x] تطوير `/checkout` إلى خطوات واضحة: details، delivery، payment preview كواجهة Design Preview.
- [x] `/order-confirmation/[id]`: رقم الطلب، المنتجات، العنوان، الإجمالي، والحالة كواجهة Design Preview.
- [x] `/account/orders/[id]`: تفاصيل الطلب السابق وtimeline كواجهة Design Preview.
- [x] `/track-order`: إدخال رقم الطلب والبريد وعرض حالة الشحن كواجهة Design Preview.
- [x] استخدام Mock orders حتى اكتمال الـ Backend.

### Journal وSEO

- [x] `/journal`: قائمة المقالات مع featured article كواجهة Design Preview.
- [x] `/journal/[slug]`: صفحة المقال بتصميم editorial مختلف عن صفحات المتجر.
- [x] نقل Journal من `/about` إلى المدونة المستقلة.
- [x] `/contact`: نموذج تواصل ومعلومات البراند.
- [x] صفحة 404 مخصصة بهوية MATHAQ.
- [x] `/privacy-policy`.
- [x] `/terms`.
- [x] `/shipping-returns`.
- [x] `/refund-policy`.
- [x] `sitemap.xml` و`robots.txt`.
- [x] metadata أساسية لكل الصفحات العامة، وcanonical/Open Graph تُستكمل مع الـ Backend/الدومين النهائي.

### Commercial extras

- [x] `/subscribe`: باقات اشتراك شهرية، skip، pause كـ UI preview.
- [x] `/gift-cards`: اختيار القيمة، بيانات المستلم، preview.
- [x] Reviews داخل صفحة المنتج كـ UI preview.
- [x] Coupon input داخل `/cart` و`/checkout` كـ UI preview.

## المرحلة 2، Admin Design-first

- [x] `/admin`: Overview مختلف حسب active section، بدون ازدحام بصري.
- [x] `/admin/products`: جدول وبحث وفلترة المنتجات كواجهة Design Preview.
- [x] `/admin/products/new`: إضافة منتج كواجهة Design Preview.
- [x] `/admin/products/[id]/edit`: تعديل منتج كواجهة Design Preview.
- [x] `/admin/orders`: قائمة الطلبات والفلاتر كواجهة Design Preview.
- [x] `/admin/orders/[id]`: تفاصيل الطلب وتغيير الحالة كواجهة Design Preview.
- [x] `/admin/customers`: قائمة العملاء كواجهة Design Preview.
- [x] `/admin/customers/[id]`: تفاصيل العميل وطلباته كواجهة Design Preview.
- [x] `/admin/inventory`: كمية كل variant وتنبيهات المخزون كواجهة Design Preview.
- [x] `/admin/content`: إدارة Journal posts كواجهة Design Preview.
- [x] Product form يدعم شكل variants حسب الحجم × الطحن كواجهة Design Preview.
- [x] Image uploader UI كواجهة Design Preview.
- [x] إضافة responsive tables وloading skeletons وconfirmation dialogs حسب الحاجة في التصميم.

## المرحلة 3، Supabase Foundation

- [ ] إضافة browser/server Supabase clients.
- [ ] إضافة environment variables المطلوبة بدون وضع secrets داخل الكود.
- [ ] إنشاء migrations وdatabase types.
- [ ] إنشاء الجداول: `users`, `products`, `product_variants`, `orders`, `order_items`, `carts`, `reviews`, `journal_posts`, `wishlists`, `coupons`.
- [ ] نقل products من hardcoded service إلى data access layer.
- [ ] إضافة Supabase Storage للصور، ما لم يتم اعتماد مزود upload آخر.

## المرحلة 4، Auth وPermissions

- [ ] Customer auth باستخدام Email/Password.
- [ ] التسجيل العام ينشئ `customer` فقط.
- [ ] إنشاء أول Admin يدوياً أو عن طريق seed آمن.
- [ ] تطبيق role values: `admin` و`customer`.
- [ ] middleware لحماية `/admin/*`.
- [ ] حماية account وorders الخاصة بالمستخدم الحالي.
- [ ] منع تغيير role من client-side.
- [ ] logout، session persistence، email verification، forgot/reset flows.

## المرحلة 5، Products وVariants

- [ ] CRUD للمنتجات من الأدمن.
- [ ] ربط كل منتج بعدة variants.
- [ ] السعر والمخزون يتم قراءتهما من الـ variant المختار.
- [ ] التحقق من السعر والمخزون على السيرفر.
- [ ] رفع وربط الصور بالمنتج.
- [ ] منع حذف منتج مرتبط بطلبات، أو استخدام soft delete.

## المرحلة 6، Orders end-to-end

- [ ] إنشاء order من السلة على السيرفر.
- [ ] حفظ `price_at_purchase` داخل `order_items`.
- [ ] التحقق من المخزون قبل إنشاء الطلب.
- [ ] خصم المخزون بشكل آمن.
- [ ] إنشاء confirmation page حقيقية.
- [ ] عرض الطلب داخل account.
- [ ] Admin order detail وتغيير الحالات:
  - `pending`
  - `shipped`
  - `delivered`
  - `cancelled`
- [ ] إبقاء Mock payment في البداية.
- [ ] بعد نجاح دورة الطلب، تجهيز Paymob checkout وcallback/webhook.

## المرحلة 7، Content وCommercial Backend

- [ ] CRUD كامل لـ Journal posts.
- [ ] draft/published status.
- [ ] SEO title وdescription وcover image.
- [ ] Reviews مرتبطة بالعميل والمنتج.
- [ ] السماح بالتقييم بعد طلب مكتمل فقط.
- [ ] Coupons مع validation وتاريخ صلاحية وحد استخدام.
- [ ] تجهيز subscription وgift cards كمرحلة تجارية مستقلة.

## ترتيب أول جلسات التنفيذ

1. تفعيل Higgsfield والتحقق من `ffmpeg`.
2. تشغيل lint/build وتثبيت baseline.
3. اعتماد Design Direction والـ motion language.
4. بناء Auth pages كأول مجموعة UI.
5. بناء Search وWishlist.
6. بناء Order confirmation وOrder details.
7. بناء Journal والصفحات القانونية وSEO.
8. بناء Admin pages والـ variant forms.
9. مراجعة كل الصفحات على desktop وmobile.
10. بعدها فقط يبدأ ربط Supabase.

## معيار قبول كل صفحة

- route يعمل بدون runtime errors.
- التصميم responsive على الموبايل والديسكتوب.
- animation واضحة وهادئة ويمكن تعطيلها مع reduced motion.
- loading، empty، error، success states موجودة عند الحاجة.
- keyboard navigation وfocus states تعمل.
- لا يوجد نص placeholder أو component بلا وظيفة واضحة.
- لا يتم اعتماد الصفحة قبل مراجعة شكلها في browser حقيقي.

## الوضع الحالي

- المشروع Next.js App Router.
- السلة تعمل محلياً باستخدام Zustand.
- المنتجات حالياً hardcoded.
- لا يوجد Backend أو Auth أو ORM حالياً.
- Node.js موجود.
- ffmpeg تم تثبيته ويحتاج إعادة فتح Terminal لظهوره في PATH.
- Higgsfield account تم إنشاؤه، لكن connector لم يظهر في جلسة الأدوات بعد.
