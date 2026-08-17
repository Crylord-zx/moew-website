/**
 * BIRTHDAY WEBSITE CONFIGURATION
 * Dedicated to Someone Special ❤️ | Forever & Ever Yours
 *
 * Every value below falls back to its original default when
 * window.__PAGE_DATA__ (injected in <head>, before this script runs)
 * doesn't have that field — this is the admin/customize-editable data
 * source, read the same way as every hand-patched "Format 2" template
 * in this project (see admin-lib.js's top-of-file comment).
 */
(function () {
  var D = window.__PAGE_DATA__ || {};
  var g = function (key, fallback) { return (key in D) ? D[key] : fallback; };

  window.BIRTHDAY_CONFIG = {
    name: g('name', 'Someone Special'),
    petName: g('petName', 'My Love'),
    author: g('author', 'Forever Yours'),
    birthDate: g('birthDate', '2005-08-13T00:00:00'),
    subtitle: g('subtitle', 'Happy Birthday to Someone Special! Our journey made of pure magic, forever & always ❤️'),
    dateTag: g('dateTag', 'SPECIAL DAY'),
    madeForText: g('madeForText', 'FOREVER & EVER YOURS ❤️'),
    heroBgImage: g('heroBgImageUrl', '/imported/jashnova-3d-romantic-birthday/images/moonlight.webp'),

    audio: {
      enabled: true,
      src: g('audioUrl', '/imported/jashnova-3d-romantic-birthday/song/song.mp3')
    },

    chapters: [
      {
        id: 1,
        date: g('chapter1Date', 'Our Journey Begins'),
        title: g('chapter1Title', '🌸 Beautiful Beginnings'),
        subtitle: g('chapter1Subtitle', 'When Two Hearts Found Each Other'),
        text: g('chapter1Text', '<p>From the very first moment we met, everything in my world began to feel warmer and brighter.</p><p>Every shared conversation, every innocent laugh, and every quiet moment brought us closer together. What started as a small spark has grown into an unforgettable journey filled with sweetness, trust, and happiness.</p><p>Thank you for being the most incredible person in my life. Every day with you is a gift I treasure with all my heart.</p>'),
        images: [
          g('chapter1Image1Url', '/imported/jashnova-3d-romantic-birthday/images/spring.webp'),
          g('chapter1Image2Url', '/imported/jashnova-3d-romantic-birthday/images/coffee.webp'),
          g('chapter1Image3Url', '/imported/jashnova-3d-romantic-birthday/images/sunrise.webp'),
          g('chapter1Image4Url', '/imported/jashnova-3d-romantic-birthday/images/theater.webp')
        ],
        badge: g('chapter1Badge', 'CHAPTER 01'),
        signature: g('chapter1Signature', 'Forever & Ever Yours ❤️')
      },
      {
        id: 2,
        date: g('chapter2Date', 'Our Endless Promise'),
        title: g('chapter2Title', '💖 Forever & Always'),
        subtitle: g('chapter2Subtitle', 'Growing Together Through Every Moment'),
        text: g('chapter2Text', '<p>With every passing day, my love and affection for you only grow deeper and stronger.</p><p>No matter where life leads us, you will always be my safest place, my favorite smile, and my endless source of joy.</p><p>Here’s to every dream we share, every beautiful memory waiting for us, and a bright, wonderful future together.</p><strong class="highlight-quote">Happy Birthday to Someone Special! Forever & Always ❤️</strong>'),
        images: [
          g('chapter2Image1Url', '/imported/jashnova-3d-romantic-birthday/images/moonlight.webp'),
          g('chapter2Image2Url', '/imported/jashnova-3d-romantic-birthday/images/beach.webp'),
          g('chapter2Image3Url', '/imported/jashnova-3d-romantic-birthday/images/autumn.webp'),
          g('chapter2Image4Url', '/imported/jashnova-3d-romantic-birthday/images/song.webp')
        ],
        badge: g('chapter2Badge', 'CHAPTER 02'),
        signature: g('chapter2Signature', 'Forever & Ever Yours ❤️')
      }
    ],

    wishes: [
      g('wish1', 'Happy Birthday to Someone Special! May your life be filled with success, peace, and endless love! ❤️'),
      g('wish2', 'You are my safest place, my favorite memory, and my future dream. Happy Birthday my love! 🌸'),
      g('wish3', 'Through every moment and journey, my heart chooses you today and always! ✨'),
      g('wish4', 'May all your dreams turn into glorious achievements! Forever & Ever Yours ❤️')
    ]
  };
})();
