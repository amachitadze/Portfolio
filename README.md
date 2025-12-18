
# მინიმალისტური და ელეგანტური პორტფოლიო

ეს არის პრემიუმ კლასის პორტფოლიო ვებსაიტი, შექმნილი React-ით და Tailwind CSS-ით. პროექტი იყენებს ატომური დიზაინის პრინციპებს და გლობალური მდგომარეობის მართვას.

## ტექნოლოგიური სტეკი
- **React 19** (ES Modules)
- **Tailwind CSS** (Custom Brand Colors)
- **Supabase** (Database & Storage)
- **Context API** (State Management)

## მონაცემთა ბაზის გამართვა
საიტის სრულყოფილი მუშაობისთვის:
1. შედით [Supabase Dashboard](https://app.supabase.com/)-ზე.
2. გახსენით **SQL Editor**.
3. დააკოპირეთ და გაუშვით (Run) `schema.sql` ფაილში მოცემული კოდი.
4. დაამატეთ `SUPABASE_URL` და `SUPABASE_ANON_KEY` თქვენს Environment Variables-ში.

## გარემოს ცვლადები (.env)
- `SUPABASE_URL`: თქვენი პროექტის URL.
- `SUPABASE_ANON_KEY`: პროექტის API გასაღები.
- `ADMIN_PASSWORD`: ადმინ პანელის პაროლი (Default: `admin123`).
- `GALLERY_PASSWORD`: გალერეის პაროლი (Default: `gallery123`).
- `IMGBB_API_KEY`: სურათების ასატვირთად (ImgBB API).

## სტრუქტურა
- `/components`: ხელახლა გამოყენებადი კომპონენტები (ნავიგაცია, სექციები, აიკონები).
- `/pages`: ძირითადი გვერდები (Home, Detail, Admin).
- `/store`: აპლიკაციის გლობალური მდგომარეობა.
- `/locales`: მრავალენოვანი მხარდაჭერა (GEO, ENG, ESP).
- `/types`: TypeScript ინტერფეისები.

## დიზაინის მახასიათებლები
- **ფერი:** ძირითადი შავი ფერი - `#32353f`.
- **მომრგვალება:** ბარათები - 28px, სურათები - 20px, ღილაკები - 14-18px.
- **თემები:** სრული Light/Dark მოდის მხარდაჭერა.

## ავტორი
შექმნილია მაღალი სტანდარტების დაცვით.
