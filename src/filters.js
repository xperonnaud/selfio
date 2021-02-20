
 import Vue from 'vue'
 import C from '@/constants'
 import moment from "moment";

 Vue.filter("weightUnitFilter", function (value, unit = 'g', sup = true) {
     if (!value) return '0';

     let convertedWeight = null;

     if (unit === 'g') {
         convertedWeight = Math.round(value);

         if(convertedWeight >= 1000 && sup)
             convertedWeight = (Math.round(convertedWeight * C.G_TO_KG * 10) / 10);

     } else if (unit === 'oz') {
         convertedWeight = (Math.round(value * C.G_TO_OZ * 10) / 10);

         if(convertedWeight >= 96 && sup)
             convertedWeight = (Math.round(convertedWeight * C.OZ_TO_LB * 10) / 10);
    }

     return convertedWeight;
 });

 Vue.filter("supWeightUnitFilter", function (value, unit = 'g') {
     if (!value) return '0';

     if(unit === 'g')
         return (Math.round(value * C.G_TO_KG * 10) / 10);

     if(unit === 'oz')
         return (Math.round(value * C.OZ_TO_LB * 10) / 10);
 });

 Vue.filter("distanceUnitFilter", function (value, unit = 'km') {
     if (!value) return '0';

     if(unit === 'km')
         return (Math.round(value * 10) / 10);

     if(unit === 'mi')
         return (Math.round(value * C.KM_TO_MI * 10) / 10);
 });

 Vue.filter("elevationUnitFilter", function (value, unit = 'm') {
     if (!value) return '0';

     if(unit === 'm')
         return Math.round(value);

     if(unit === 'ft')
         return Math.round(value * C.M_TO_FT);
 });

 Vue.filter("temperatureUnitFilter", function (value, unit = '&#8451;') {
     if (!value) return 0;

     if(unit === '&#8451;') // celsius
         return value;

     if(unit === '&#8457;') // fahrenheit
         return Math.round((value * 9/5) + 32);
 });

 Vue.filter("capitalizeFirstFilter", function (value) {
     if (!value) return '';
     if (typeof value == 'number') return value;
     return value.toString().charAt(0).toUpperCase() + value.slice(1);
 });

 Vue.filter("capitalizeFilter", function (value) {
     if (!value) return '';
     if (typeof value == 'number') return value;
     return value.toLowerCase()
         .split(' ')
         .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
         .join(' ');
 });

 Vue.filter("minifyTextFilter", function (value) {
     if (!value) return '';
     if (typeof value == 'number') return value;
     return (value.substring(0,4)+'.');
 });

 Vue.filter("removeLastCommaFilter", function (value) {
     if (!value) return '';
     return value.toString().replace(/,\s*$/, "");
 });

 Vue.filter("removeAllDotsFilter", function (value) {
     if (!value) return '';
     return value.toString().replace(/\./g, "");
 });

 Vue.filter("cleanOfferNameFilter", function (value) {
     if (!value) return '';
     return value.toString().replace(' Package', '').toLowerCase();
 });

 Vue.filter("accronymFilter", function (value) {
     if (!value) return '';
     return value.toString().substring(0, 3);
 });

 Vue.filter("lowerCaseFilter", function (value) {
     if (!value) return '';
     return value.toString().toLowerCase();
 });

 Vue.filter("camelizeFilter", function (value) {
     if (!value) return '';
     return value.toString().split(' ').join('-').toLowerCase();
 });

 Vue.filter("uncamelizeFilter", function (value) {
     if (!value) return '';
     value = value.toString().split('-').join(' ');
     return value.replace(
         /\w\S*/g,
         function(txt) {
             return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
         });
 });

 Vue.filter("trimZerosFilter", function (value) {
     if (!value) return '';
     return value.replace(/^(6777)0+(\d+)$/g, '$1-$2');
 });

 Vue.filter("resizeFilter", function (value, LastIndex, firstIndex = 0) {
     if (!value) return '';
     return value.toString().substring(firstIndex, LastIndex);
 });

 Vue.filter("convertSpecialCharsFilter", function (value) {
     if (!value) return '';
     return value.toString().replace(/_/g," / ");
 });

 Vue.filter("removeSlashFilter", function (value) {
     if (!value) return '';
     return value.toString().substring(1);
 });

 Vue.filter("noDashFilter", function (value) {
     if (!value) return '';
     return value.toString().replace(/-+/g," ")
 });

 Vue.filter("singularFilter", function (value) {
     if (!value) return '';
     return value.toString().replace(/s$/,"").replace(/ie$/,"y")
 });

 Vue.filter("roundIntFilter", function (value) {
     if (!value) return 0;
     return (value).toFixed(0);
 });

 Vue.filter("roundDecimalFilter", function (value) {
     if (!value) return 0;
     return (value).toFixed(2);
 });

 Vue.filter("thousandthFilter", function (value) {
     value = parseFloat(value);
     return (value/1000).toFixed(1);
 });

 Vue.filter("percentageFilter", function (value, list, total) {
     let nbInList = total ? total : list.length;
     return (Math.floor((value / nbInList) * 100));
 });

 Vue.filter("minimalDateFilter", function (date, format = 'DD-MM-YY') {
     if(!date)
         return '.';

     return moment(date).format(format);
 });

 Vue.filter("dateFilter", function (date, format = 'dddd Do MMMM - YYYY') {
     if(!date)
         return '.';

     return moment(date).format(format);
 });

 Vue.filter("mobileDayMonthFilter", function (date) {
     if(!date)
         return '.';

     return moment(date).format('DD-MM');
 });

 Vue.filter("minDateFilter", function (date, format = 'MMM Do YY') {
     if(!date)
         return '.';

     return moment(date).format(format);
 });

 Vue.filter("dayMonthFilter", function (date, format = 'dd MMM Do YYYY') {
     if(!date)
         return '.';

     return moment(date).format(format);
 });

 Vue.filter("yearFilter", function (date) {
     if(!date)
         return '';

     return moment(date).format('YYYY');
 });

 Vue.filter("timeFilter", function (time) {
     if(!time)
         return '';

     return moment(time).format('HH:mm');
 });