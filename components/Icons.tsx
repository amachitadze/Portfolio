
import React from 'react';

export const GlobeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
    <path strokeWidth="1.5" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const SunIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
  </svg>
);

export const MoonIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export const LocationIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export const MailIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
    <path d="M7 9.5H17" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> 
    <path d="M7 14.5H14" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> 
  </svg>
);

export const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

export const LinkedInIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
    <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
    <path d="M17.6361 7H17.6477" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
  </svg>
);

export const TelegramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
    <path d="M10.11 13.6501L13.69 10.0601" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
  </svg>
);

export const ThreadsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 11.5C5 9.61438 5 8.67157 5.58579 8.08579C6.17157 7.5 7.11438 7.5 9 7.5H15C16.8856 7.5 17.8284 7.5 18.4142 8.08579C19 8.67157 19 9.61438 19 11.5V12.5C19 14.3856 19 15.3284 18.4142 15.9142C17.8284 16.5 16.8856 16.5 15 16.5H9C7.11438 16.5 6.17157 16.5 5.58579 15.9142C5 15.3284 5 14.3856 5 12.5V11.5Z" stroke="currentColor" strokeWidth="1.5"></path> 
    <path d="M19 2V2.5C19 3.88071 17.8807 5 16.5 5H7.5C6.11929 5 5 3.88071 5 2.5V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> 
    <path d="M19 22V21.5C19 20.1193 17.8807 19 16.5 19H7.5C6.11929 19 5 20.1193 5 21.5V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
  </svg>
);

export const BehanceIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 19C1.67157 19 1 18.3284 1 17.5V6.5C1 5.67157 1.67157 5 2.5 5H8C13 5 13 11.5 10 11.5C13 11.5 14 19 8 19H2.5ZM4.5 11C4.22386 11 4 10.7761 4 10.5V7.5C4 7.22386 4.22386 7 4.5 7H7C7 7 9 7 9 9C9 11 7 11 7 11H4.5ZM4.5 13C4.22386 13 4 13.2239 4 13.5V16.5C4 16.7761 4.22386 17 4.5 17H8C8 17 9.5 17 9.5 15C9.5 13 8 13 8 13H4.5Z" fill="currentColor"></path> 
    <path fillRule="evenodd" clipRule="evenodd" d="M21.499 14.0034C22.3279 14.0034 23.0212 13.3199 22.8522 12.5085C21.6065 6.52886 12.9128 7.08088 13 14.0034C13.0665 19.2762 20.4344 20.9671 22.6038 16.1898C22.9485 15.4308 22.1747 14.9997 21.5372 14.9997C20.9706 14.9997 20.5313 15.5223 20.1693 15.9582C19.1272 17.2132 15.9628 17.1221 15.5449 14.5142C15.5005 14.2375 15.7304 14.0034 16.0106 14.0034H21.499ZM15.8184 11.9997C15.671 11.9997 15.5758 11.8453 15.6545 11.7207C16.7141 10.0424 19.2614 10.0605 20.3398 11.7189C20.4207 11.8434 20.3257 11.9997 20.1772 11.9997H15.8184Z" fill="currentColor"></path> 
    <path d="M16 6C15.4477 6 15 6.44772 15 7C15 7.55228 15.4477 8 16 8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H16Z" fill="currentColor"></path>
  </svg>
);

export const DribbbleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-2.47-.746-4.798-.346-.983 2.474-1.99 4.605-2.116 4.862 3.313-1.076 5.867-3.307 6.915-4.516zM10.316 21.6c.137-.27 1.15-2.403 2.136-4.918-2.312.635-4.605.586-4.912.578 1.02 1.94 2.756 3.49 4.84 4.34h-.064zM4.176 15.408c.187.003 2.83.05 5.514-.647-1.017-2.528-2.134-4.638-2.316-4.982-2.12.8-3.76 2.38-4.52 4.316l1.32.313zm.88-8.2c.16.29 1.44 2.64 2.503 5.022 2.31-.832 4.545-2.09 4.673-2.162-1.21-2.156-2.49-4.14-2.592-4.296-2.02.57-3.76 1.83-4.584 3.436zM13.644 3.1c.11.16 1.455 2.21 2.66 4.43 2.24-.763 3.12-1.96 3.193-2.062-1.614-1.48-3.75-2.37-6.1-2.37l.247.002zm2.196 6.87c-.12.065-2.56 1.402-5.06 2.308.105.253.94 2.26 1.11 2.68 2.314-.307 4.757.24 5.02.303.153-1.15.17-3.41-.01-5.32l-1.06.03z"/>
  </svg>
);

export const SubstackIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 48 48" id="a" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor">
    <path fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="m40.0248,10.0817v-4.5814c-.3229,0-.7411-.0004-1.6553-.0004l-28.9669.0004c-.9142,0-1.318,0-1.6553,0v4.5814c.2164,0,.7411.0005,1.6553.0005l28.9669-.0005c.9142,0,1.4122,0,1.6553,0Z"></path>
    <path fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="m40.0248,18.3503v-4.5814H9.4025c-.9142,0-1.3777,0-1.6553,0v4.5814c.2646,0,.7411,0,1.6553,0h30.6223Z"></path>
    <path fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="m40.2557,42.4999v-20.1821c0-.1633-.9724-.1077-1.8866-.1077H9.4022c-.9142,0-1.6553-.0555-1.6553.1077v19.8878c.2814-.1622,15.3415-8.2118,16.1691-8.5978.5156.2972,13.6461,7.3385,16.3406,8.8914l-.0008.0007Z"></path>
  </svg>
);

export const DocumentIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M10.3635,4.51A1.9944,1.9944,0,0,0,8.4189,6.5043V41.5056A1.9945,1.9945,0,0,0,10.3635,43.5H37.5867a1.9944,1.9944,0,0,0,1.9944-1.9944V14.4719H31.6036a1.9945,1.9945,0,0,1-1.9446-1.9944V4.5Z"></path>
    <line fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" x1="29.5693" y1="4.51" x2="39.5312" y2="14.4719"></line>
    <line fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" x1="15.838" y1="22.928" x2="32.1121" y2="22.928"></line>
    <line fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" x1="15.838" y1="34.994" x2="32.1121" y2="34.994"></line>
    <line fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" x1="15.838" y1="28.961" x2="32.1121" y2="28.961"></line>
  </svg>
);

export const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M10.8376,25a5.9314,5.9314,0,0,1,5.7777-6,5.9712,5.9712,0,0,1,4.2222,10.2222c-2.4444,2-10,7.7778-10,7.7778H22.6153"></path>
    <polyline fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" points="27.561 37 37.236 19 25.311 19"></polyline>
    <circle fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" cx="32.5" cy="11" r="2.5"></circle>
    <circle fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" cx="15.5" cy="11" r="2.5"></circle>
    <path fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7.5,5.5a2,2,0,0,0-2,2v33a2,2,0,0,0,2,2h33a2,2,0,0,0,2-2V7.5a2,2,0,0,0-2-2Z"></path>
  </svg>
);

export const LinkIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 48.00 48.00" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor">
    <path fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M22.8646,12.73l3.9427-3.9424A8.781,8.781,0,0,1,39.2122,21.1918l-5.6351,5.6149a8.7418,8.7418,0,0,1-12.3622.0233l-.0234-.0233"></path>
    <path fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M25.1354,35.27l-3.9427,3.9424A8.781,8.781,0,0,1,8.7878,26.8082l5.6351-5.6149A8.7418,8.7418,0,0,1,26.7851,21.17l.0234.0233"></path>
  </svg>
);
