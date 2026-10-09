import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
const origin = 'https://andylinghaozhi.github.io';
const base = '/fundtime-support';
const email = 'fundlandeducation@gmail.com';
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const texts = {
  zh: {
    lang:'zh-HK', support:'支援', privacy:'私隱政策', date:'更新日期：2026 年 10 月 10 日',
    intro:'把每天的娛樂與社交 App 時間，變成可以規劃、存下和提領的分鐘。FundTime 適用於 iPhone，需 iOS 26 或以上及 Screen Time 授權。',
    supportIntro:'從設定每日預算，到試用、購買及解除管制。',
    questions:[
      ['如何開始使用？','在 FundTime 完成設定，按星期選擇每日預算及結算時間，再選擇要管制的 App 或類別。開始試用或購買後，所選 App 會封鎖；使用前，先在 FundTime 預覽並提領時間。用滿後，系統會再次封鎖。'],
      ['免費下載與 7 日試用有甚麼分別？','FundTime 免費下載。完成設定後，按「開始 7 日試用」才會建立一筆免費的 App Store 交易並開始試用。試用期間可使用全部功能，不會自動收費。Apple 帳戶中的原始交易日期及本機 Keychain 副本會用來確認試用開始時間；重新安裝不會重置試用。'],
      ['試用結束會怎樣？','如未購買完整版本，所選 App 會解除封鎖，每日結算停止，活期、定存與記錄保留在 iPhone。完整版本是一次購買，不設訂閱，支援家庭共享。實際價格以 App Store 購買畫面為準。'],
      ['如何恢復購買？','使用原來購買的 Apple 帳戶，在 FundTime 的試用或購買頁按「恢復購買」。先確認 iPhone 已連接網絡；若仍未找到記錄，檢查 App Store 的購買記錄，以及家庭共享的購買分享設定。'],
      ['所選 App 沒有如預期封鎖，應如何處理？','確認 FundTime 的 Screen Time 授權仍有效，並檢查所選 App、類別及今日管制狀態。系統套用封鎖可能有延遲。回到 FundTime 讓狀態更新；若問題持續，請聯絡支援並提供 iOS 與 FundTime 版本及發生時間。'],
      ['如何停止 FundTime 的管制？','可在 iPhone 的 iOS 設定中撤銷 FundTime 的 Screen Time 授權。撤銷後，FundTime 會解除其管制。試用到期而未購買亦會解除全部封鎖。'],
      ['通知與語言可以更改嗎？','可在 FundTime 設定中選擇通知種類，以及「跟隨系統／繁體中文（香港）／English」。通知是否允許亦可在 iOS 設定更改。App 語言會同步到通知、遮罩與小工具。'],
      ['資料有雲端備份或同步嗎？','FundTime 沒有帳號、後端或雲端同步。時間帳本與偏好保存在 iPhone。刪除 App 會移除其本機 App 資料；Keychain 的試用開始日期及 App Store 交易可能仍保留。請不要把重新安裝當作排錯的第一步，以免失去本機記錄。']
    ],
    contact:'聯絡支援', contactBody:'請提供 FundTime 版本、iOS 版本、問題發生時間與重現步驟。可附上已移除私人資料的畫面；毋須傳送帳本、所選 App 清單、Apple 帳戶密碼或付款資料。', contactLink:'傳送支援電郵',
    policyIntro:'FundTime 的資料保留在你的 iPhone。本政策說明 App、本機 extension、購買，以及你主動聯絡支援時的資料處理。',
    sections:[
      ['本機資料','每日預算、提領、定存、歷史記錄及偏好保存在本機。主 App 與 extension 透過 iOS App Group 共用管制、小工具和本機通知所需的快照與事件。FundTime 沒有使用者帳號、開發者後端、廣告、分析服務或雲端同步；不會把時間記錄或裝置用量傳送給開發者。'],
      ['Screen Time 授權','FundTime 使用 Apple 的 Family Controls、Managed Settings 與 Device Activity 管理你選擇的 App 及類別。Apple 提供私隱選擇 token；FundTime 不會讀取訊息、瀏覽內容或你在所選 App 內的操作內容。你可更改選擇，亦可在 iOS 設定撤銷授權以停止管制。'],
      ['通知與小工具','提醒在 iPhone 本機排程。你可在 FundTime 選擇通知種類，或在 iOS 設定關閉通知。小工具只顯示本機快照中的剩餘分鐘及相關狀態，不連接開發者伺服器。'],
      ['試用與購買','Apple 透過 App Store 處理免費試用與購買。FundTime 讀取經驗證的購買狀態及試用開始日期，不會取得付款卡資料。試用開始日期的副本保存在 iPhone 的 Keychain，避免重新安裝後重新開始試用。Apple 可恢復與 Apple 帳戶相連的交易；Apple 的資料處理由其私隱政策規管。'],
      ['刪除與保留','移除 FundTime 會刪除其本機 App 記錄。Keychain 的試用開始日期及 App Store 交易可能仍保留；移除 App 不會刪除 Apple 的購買記錄。FundTime 沒有可供刪除的雲端帳號或同步服務。'],
      ['支援電郵','只有當你主動傳送電郵時，開發者才會收到你提供的電郵地址、訊息與附件。這些資料用於回覆及處理你的支援請求，經電郵服務處理。請避免傳送密碼、付款資料、所選 App 清單或不必要的私人資料。你可電郵要求刪除你提交的支援訊息；Apple 保管的交易記錄須向 Apple 處理。'],
      ['這個網站','網站只提供支援與私隱說明，沒有自行加入分析、廣告、追蹤程式或表單。GitHub Pages 託管服務可能為提供及保護網站而處理連線所需的技術資料。GitHub 表示會記錄並保存訪客的 IP 地址作安全用途；這與 FundTime App 的本機時間記錄分開。'],
      ['政策更新與聯絡','如 App 的資料處理方式改變，本政策會更新並顯示新日期。私隱問題或支援請求可聯絡下方電郵。']
    ]
  },
  en: {
    lang:'en-GB', support:'Support', privacy:'Privacy policy', date:'Updated 10 October 2026',
    intro:'Plan, save and withdraw the minutes you use in entertainment and social apps. FundTime is for iPhone and requires iOS 26 or later and Screen Time authorisation.',
    supportIntro:'Help with daily budgets, the trial, purchases and app blocking.',
    questions:[
      ['How do I get started?','Complete setup in FundTime, choose a daily budget for each weekday and a settlement time, then select the apps or categories to manage. Once you start the trial or purchase full access, selected apps are blocked. Preview and withdraw minutes in FundTime before using them. When those minutes are used, iOS applies the block again.'],
      ['How does the free trial work?','FundTime is free to download. After setup, tap Start 7-day trial to create a free App Store transaction and begin the trial. All features are available for seven days, with no automatic charge. The original verified transaction date and a local Keychain copy record when the trial began; reinstalling does not restart it.'],
      ['What happens when the trial ends?','Without a full unlock purchase, all FundTime blocks are removed and daily settlement stops. Savings, term deposits and history stay on this iPhone. Full access is a single purchase, with no subscription, and supports Family Sharing. The App Store purchase sheet shows the applicable price.'],
      ['How do I restore a purchase?','Use the Apple Account that made the purchase, then tap Restore purchases on the trial or purchase screen. Check that your iPhone is online. If no record is found, check your App Store purchase history and the purchase sharing settings for your family.'],
      ['Why is a selected app not blocked as expected?','Check that Screen Time authorisation for FundTime is still active, then check your selection and today’s control status. iOS may take time to apply a block. Open FundTime to refresh its state. If the problem continues, contact support with your iOS and FundTime versions and the time it occurred.'],
      ['How do I stop FundTime’s control?','You can revoke FundTime’s Screen Time authorisation in iOS Settings. FundTime removes its control after revocation. All blocks are also removed when the trial expires without a full unlock purchase.'],
      ['Can I change notifications and language?','FundTime settings let you choose notification types and select System, Traditional Chinese (Hong Kong) or English. Notification permission can also be changed in iOS Settings. The app language is shared with notifications, shields and widgets.'],
      ['Are my records synced or backed up to a cloud service?','FundTime has no account, server or cloud sync service. Its time ledger and preferences stay on your iPhone. Removing the app deletes its local app records; the trial date in Keychain and App Store transactions may remain. Avoid reinstalling as your first troubleshooting step, as local records may be lost.']
    ],
    contact:'Contact support', contactBody:'Include your FundTime version, iOS version, when the issue occurred and the steps to reproduce it. You may include a screenshot after removing private information. Do not send your ledger, app selection, Apple Account password or payment details.', contactLink:'Email support',
    policyIntro:'FundTime keeps its records on your iPhone. This policy describes the app, its local extensions, purchases and information you choose to send when contacting support.',
    sections:[
      ['Local records','Budgets, withdrawals, term deposits, history and preferences are stored locally. The app and its extensions share only the snapshots and events needed for control, widgets and local notifications through an iOS App Group. FundTime has no user account, developer server, advertising, analytics service or cloud sync. It does not send time records or device usage to the developer.'],
      ['Screen Time authorisation','FundTime uses Apple’s Family Controls, Managed Settings and Device Activity frameworks to manage the apps and categories you select. Apple provides private selection tokens. FundTime does not read messages, browsing content or what you do inside selected apps. You can change your selection or revoke authorisation in iOS Settings to stop control.'],
      ['Notifications and widgets','Reminders are scheduled locally on your iPhone. You can choose notification types in FundTime or turn off notifications in iOS Settings. Widgets display remaining minutes and related states from local snapshots and do not connect to a developer server.'],
      ['Trial and purchases','Apple handles trial and purchase transactions through the App Store. FundTime reads verified purchase status and the trial start date, and does not receive payment card details. A copy of the trial start date is stored in this iPhone’s Keychain so reinstalling does not restart the trial. Apple may restore transactions linked to your Apple Account. Apple’s handling of data is covered by its privacy policy.'],
      ['Removal and retention','Removing FundTime deletes its local app records. The trial start date in Keychain and App Store transactions may remain; removing the app does not delete Apple’s purchase records. FundTime provides no cloud account or sync service.'],
      ['Support email','The developer receives your email address, message and attachments only when you choose to email support. They are used to respond to and resolve your request and are handled by an email service. Avoid sending passwords, payment details, app selections or unnecessary private information. You may email to request deletion of support messages you submitted. Requests about transaction records held by Apple must be directed to Apple.'],
      ['This website','This website provides support and privacy information. It has no added analytics, advertising, tracking scripts or forms. GitHub Pages may process technical connection information to deliver and protect this website. GitHub states that it logs and stores visitors’ IP addresses for security purposes. This is separate from the local time records in the FundTime app.'],
      ['Changes and contact','If the app’s handling of data changes, this policy will be updated with a new date. Contact the email address below with privacy questions or support requests.']
    ]
  }
};
function render(locale,type){
  const t=texts[locale], privacy=type==='privacy', root=base+(locale==='en'?'/en':'');
  const alternate=base+(locale==='en'?'/'+type+'/':'/en/'+type+'/');
  const title=privacy?t.privacy:t.support;
  const items=privacy?t.sections:t.questions;
  const content=items.map(([h,p])=>privacy?`<section><h2>${escape(h)}</h2><p>${escape(p)}</p></section>`:`<details><summary>${escape(h)}</summary><p>${escape(p)}</p></details>`).join('\n');
  return `<!doctype html><html lang="${t.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FundTime · ${title}</title><meta name="description" content="${escape(privacy?t.policyIntro:t.supportIntro)}"><link rel="canonical" href="${origin}${root}/${type}/"><link rel="icon" href="${base}/icon.png"><link rel="stylesheet" href="${base}/style.css"></head><body><a class="skip" href="#main">${locale==='en'?'Skip to content':'跳至內容'}</a><header><a class="brand" href="${root}/support/"><img src="${base}/icon.png" width="40" height="40" alt=""><span>FundTime</span></a><nav aria-label="${locale==='en'?'Main':'主要'}"><a ${!privacy?'aria-current="page"':''} href="${root}/support/">${t.support}</a><a ${privacy?'aria-current="page"':''} href="${root}/privacy/">${t.privacy}</a><a href="${alternate}" lang="${locale==='en'?'zh-HK':'en-GB'}">${locale==='en'?'繁體中文':'English'}</a></nav></header><main id="main"><div class="intro"><p class="eyebrow">FundTime · iPhone</p><h1>${title}</h1><p class="lead">${privacy?t.policyIntro:t.supportIntro}</p>${privacy?`<p class="date">${t.date}</p>`:`<p>${t.intro}</p>`}</div><div class="bodycopy">${content}</div><aside><h2>${t.contact}</h2>${!privacy?`<p>${t.contactBody}</p>`:''}<a class="contact" href="mailto:${email}?subject=FundTime%20support">${email}<span aria-hidden="true"> ↗</span></a></aside>${privacy?'<p class="apple"><a href="https://www.apple.com/legal/privacy/">Apple '+(locale==='en'?'Privacy Policy':'私隱政策')+'</a></p>':''}</main><footer><span>FundTime</span><span>${t.date}</span></footer></body></html>`;
}
for(const locale of ['zh','en'])for(const type of ['support','privacy']){
  const dir=`docs/${locale==='en'?'en/':''}${type}`;
  mkdirSync(dir,{recursive:true});writeFileSync(`${dir}/index.html`,render(locale,type));
}
writeFileSync('docs/index.html',render('zh','support'));
copyFileSync('assets/icon.png','docs/icon.png');

copyFileSync('assets/style.css','docs/style.css');
writeFileSync('docs/.nojekyll','');
