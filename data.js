/** copy data.csv string here **/
const DATA = `
authors,hebMovieName,length,type,tecnique,screenRoom,group,order,imageName
"רימה גפן, ניקה ז'וקובה",לב אוחז,08:49,אנימציה,סטופ,212 | קומה 2,10:00 | 14:30 | 19:00 | מקבץ 1,1,Heart.png
נעמה יראון,Yoga Warming,04:52,אנימציה,קלאסית,2043 | 2044 | קומה מינוס 2,10:00 | 14:30 | 19:00 | מקבץ 1,2,Yoga_warming.png
"יובל בק, אופק מזרחי",Out of Order,05:55,אנימציה,תלת,2043 | 2044 | קומה מינוס 2,10:00 | 14:30 | 19:00 | מקבץ 1,3,out_of_order.png
"יגאל גורן, גל פרס",בתהליך,06:50,אנימציה,קלאסית,2060 | 2042 | קומה מינוס 2,10:00 | 14:30 | 19:00 | מקבץ 1,4,WIP.png
אביה חנינה,אביה,04:19,אנימציה,קלאסית,2043 | 2044 | קומה מינוס 2,10:00 | 14:30 | 19:00 | מקבץ 1,5,Aviya.png
"אביב גפני, עלמה קיני","אוף, תקשיבי",06:05,אנימציה,קלאסית,213 | קומה 2,10:30 | 15:00 | 19:30 | מקבץ 2,1,"Ugh, listen.PNG"
"עמית שבתאי לוי, הילי מזרחי, עדי פרייליך",כאן גר בכיף,05:20,אנימציה,תלת,2060 | 2042 | קומה מינוס 2,10:30 | 15:00 | 19:30 | מקבץ 2,2,Home Sweet Home.png
"זואי כהנא, איילת פרידמן",כוונות טובות,07:12,אנימציה,קלאסית | תלת,2043 | 2044 | קומה מינוס 2,10:30 | 15:00 | 19:30 | מקבץ 2,3,CATFOOD.png
מיכל לוסטיג,סיפור של מישהי אחרת,04:37,אנימציה,קלאסית | תלת,212 | קומה 2,10:30 | 15:00 | 19:30 | מקבץ 2,4,Someone Elses Story.jpg
"נועה גפן, עדן גרוסמן",מיקומך בתור,07:16,אנימציה,סטופ,2046 | 2045 | קומה מינוס 2,10:30 | 15:00 | 19:30 | מקבץ 2,5,your place in line.png
זוהר ברנוביץ',אוויר ארוך,49:11,וידאו,,214 | קומה 2,11:00 | 15:30 | 20:00 | מקבץ 3,1,long_air.png
נגה סגל,נשארתי עם זכרון של הרגש,17:18,וידאו,,214 | קומה 2,11:00 | 15:30 | 20:00 | מקבץ 3,2,I remain with the memory of how i felt.png
"דביר באום, ענבר פוטרמן, עדי כ""ץ",א ווארט איז א ווארט,08:03,אנימציה,קלאסית,213 | קומה 2,12:35 | 17:05 | מקבץ 4,1,A vort is A vort.png
"שחר עמור, אנסטסיה פיליפצ'וק, לירון קאגו אליהו",חצים שבורים,04:42,אנימציה,תלת,2060 | 2042 | קומה מינוס 2,12:35 | 17:05 | מקבץ 4,2,Broken Arrows.png
יותם גורן,Chosen't,06:25,אנימציה,קלאסית | תלת,2060 | 2042 | קומה מינוס 2,12:35 | 17:05 | מקבץ 4,3,Chosent.png
עינב גולן,ירח באמצע היום,04:06,אנימציה,קלאסית,2046 | 2045 | קומה מינוס 2,12:35 | 17:05 | מקבץ 4,4,middays_moon.png
נועם גולדפרב,בחירה חשובה,02:50,אנימציה,תלת,2060 | 2042 | קומה מינוס 2,12:35 | 17:05 | מקבץ 4,5,Prime_Choice.png
נטע געש,I I I,08:15,אנימציה,קלאסית | משולבת,2060 | 2042 | קומה מינוס 2,12:35 | 17:05 | מקבץ 4,6,III.png
עמרי לשניק,יואל ארציאלי,03:45,אנימציה,סטופ | וידאו,2043 | 2044 | קומה מינוס 2,12:35 | 17:05 | מקבץ 4,7,Yoel-Arzieli.png
"שיר יוסף, ולריה לוצ'נצ'וב",צ'רנו,07:55,אנימציה,קלאסית,2060 | 2042 | קומה מינוס 2,13:00 | 17:30 | מקבץ 5,1,CHERNO.png
דניאל אלתר ואלי חופמן,כיסופים,06:24,אנימציה,סטופ,2043 | 2044 | קומה מינוס 2,13:00 | 17:30 | מקבץ 5,2,Kissufim.png
הילה ארוסי,ילדה וחלל,06:30,אנימציה,קלאסית,2046 | 2045 | קומה מינוס 2,13:00 | 17:30 | מקבץ 5,3,Girl and space.png
נועה בן עזרא,דואליזם,02:45,אנימציה,קלאסית,2046 | 2045 | קומה מינוס 2,13:00 | 17:30 | מקבץ 5,4,Dualism.png
איל שפר,חוט,03:52,אנימציה,תלת,2046 | 2045 | קומה מינוס 2,13:00 | 17:30 | מקבץ 5,5,Thread.png
דין גרין,המסע של מיקה,,אנימציה,משחק מחשב,2045 | קומה מינוס 2,,,Mikas Journey.jpg
גיא וינשטיין,ליאנהוה,05:24,אנימציה,קלאסית,2060 | 2042 | קומה מינוס 2,13:00 | 17:30 | מקבץ 5,6,Lianhua.jpeg
לטם זרחיה,מהירות הזיכרון איטית ממהירות האור,,וידאו,מיצב,2047 | קומה מינוס 2,,,The speed of memory is slower.jpeg
יעל דניאלה כץ קובה,זכרונות שטופות,10:00,וידאו,,224 | קומה 2,13:25 | 17:55 | מקבץ 6,1,washed-memories.png
דור שמשון נהיר,מצבי מיזוג,,וידאו,מיצב,2053 | קומה מינוס 2,,,blendModes.png
רוני ביילין,מקלט,,וידאו,מיצב,2058 | קומה מינוס 2,,,shelter.png
עמית שכטר,POV,,וידאו,מיצג,222 | קומה 2,,,Amit_S.png
פלג זלנפרוינד,אי פעולה,,משולבת,מיצב,231 | קומה 2,,,Inaction.png
דניאל אברג'יל,The game of letting go,14:06,וידאו,,223 | קומה 2,13:25 | 17:55 | מקבץ 6,2,The game of letting go.jpg
עבל ברצה,הוריזונטל,13:38,וידאו,,220 | קומה 2,13:25 | 17:55 | מקבץ 6,3,Horizontal.png
עליזה ק. צוקרמן,חבל הטבור,19:57,וידאו,,225 | קומה 2,13:25 | 17:55 | מקבץ 6,4,umbilical cord.png
`;
