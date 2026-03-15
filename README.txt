🚀 Cookidea: AI-Driven Recipe Engine (MVP)
Cookidea هو محرك توليد وصفات يعتمد على الرؤية الحاسوبية (Computer Vision)، مصمم لحل مشكلة اتخاذ القرار في المطبخ عبر تحليل المكونات المتاحة وتطويعها لمطابخ عالمية محددة.

🛠️ المواصفات التقنية (Core Stack)
Frontend: React 18 + TypeScript (Strict Mode).

AI Engine: Google Gemini 3:1 Flash Lite (Multimodal).

Architecture: Hexagonal-inspired (Ports and Adapters) لضمان فصل منطق الـ API عن الـ UI.

Validation: TestSprite AI للتحقق من تكامل العمليات (E2E Logic Testing).

🏗️ الهندسة المعمارية (Architecture)
تم بناء المشروع بناءً على معايير Architecture Guardian لضمان استقرارية الكود:

Service Layer: عزل كامل لمنطق Gemini داخل GeminiService لتسهيل استبدال النموذج مستقبلاً.

Custom Hooks: إدارة الحالة (State Management) والعمليات غير المتزامنة عبر useRecipeGeneration.

Safety & Stability: تطبيق نظام "Timeout" و "Error Boundaries" للتعامل مع تحديات الـ API الخارجية.

🧪 تقرير الجودة (QA Report)
وفقاً لتقرير TestSprite AI:

Status: ✅ 100% Pass Rate.

TC001: تم التحقق من نظام معالجة الأخطاء (Error Handling) في حال غياب المدخلات.

Performance: تحسين استهلاك الذاكرة عبر تقنيات معالجة الصور وتحويلها لـ Base64 برمجياً.

⚙️ التشغيل (Deployment)
Environment: إعداد ملف .env وإضافة VITE_GEMINI_API_KEY.

Install: npm install

Build: npm run build (تم التحقق من خلوه من أخطاء النوع/Type Errors).