function plug_dataType() {
	//检测是否是数组
	window.is_array=function(argument){
		return argument && (typeof argument==="object") && ("length" in argument) ? true : false ;
	}
	//检测是否是对象
	window.is_object=function(argument){
		return argument && (typeof argument==="object") && !("length" in argument) ? true : false ;
	}
	//检测是否是函数
	window.is_function=function(argument){
		return argument && typeof argument==="function" ? true : false ;
	}
	//检测是否是字符串
	window.is_string=function(argument){
		return argument && typeof argument==="string" ? true : false ;
	}
	//检测是否是布尔值
	window.is_boolean=function(argument){
		return typeof argument==="boolean" ? true : false ;
	}
	//检测是否是数字（数值）
	window.is_number=function(argument){
		return typeof argument==="number" ? true : false ;
	}
	//检测是否是未定义
	window.is_undefined=function(argument){
		return typeof argument==="undefined" ? true : false;
	}
	//检测是否是为空
	window.is_null=function(argument){
		return argument===null || argument==="" ? true : false;
	}
	if (arguments&&arguments.length>0) {
		for(var i=0,len=arguments.length;i<len;i++){
			(is_function(arguments[i]))&&(arguments[i].call(this));
			if (is_object(arguments[i])) {
				for(var att in arguments[i]){
					this[att]=arguments[i][att];
				}
			}
		}
	}
}
new plug_dataType();

//加密：md5
function md5(string) {
    function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function md5_AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    function md5_F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    function md5_G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    function md5_H(x, y, z) {
        return (x ^ y ^ z);
    }
    function md5_I(x, y, z) {
        return (y ^ (x | (~z)));
    }
    function md5_FF(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_GG(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_HH(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_II(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    function md5_WordToHex(lValue) {
        var WordToHexValue = "",
        WordToHexValue_temp = "",
        lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };
    function md5_Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22;
    var S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20;
    var S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23;
    var S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = md5_AddUnsigned(a, AA);
        b = md5_AddUnsigned(b, BB);
        c = md5_AddUnsigned(c, CC);
        d = md5_AddUnsigned(d, DD);
    }
    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
}
//加密 sha1
function sha1(strings) {

	var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase */
	var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode */
	/*
	 *
	 * The main function to calculate message digest
	 *
	 */
	function hex_sha1(s){
	 	//调用该函数返回加密字符
	    return binb2hex(core_sha1(AlignSHA1(s)));
	     
	}
	 
	/*
	 *
	 * Perform a simple self-test to see if the VM is working
	 *
	 */
	function sha1_vm_test(){
	 
	    return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
	     
	}
	 
	/*
	 *
	 * Calculate the SHA-1 of an array of big-endian words, and a bit length
	 *
	 */
	function core_sha1(blockArray){
	 
	    var x = blockArray; // append padding
	    var w = Array(80);
	     
	    var a = 1732584193;
	     
	    var b = -271733879;
	     
	    var c = -1732584194;
	     
	    var d = 271733878;
	     
	    var e = -1009589776;
	     
	    for (var i = 0; i < x.length; i += 16) // 每次处理512位 16*32
	    {
	     
	        var olda = a;
	         
	        var oldb = b;
	         
	        var oldc = c;
	         
	        var oldd = d;
	         
	        var olde = e;
	         
	        for (var j = 0; j < 80; j++) // 对每个512位进行80步操作
	        {
	         
	            if (j < 16) 
	                w[j] = x[i + j];
	             
	            else
	                w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
	             
	            var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
	             
	            e = d;
	             
	            d = c;
	             
	            c = rol(b, 30);
	             
	            b = a;
	             
	            a = t;
	             
	        }
	         
	        a = safe_add(a, olda);
	         
	        b = safe_add(b, oldb);
	         
	        c = safe_add(c, oldc);
	         
	        d = safe_add(d, oldd);
	         
	        e = safe_add(e, olde);
	         
	    }
	     
	    return new Array(a, b, c, d, e);
	     
	}
	 
	/*
	 *
	 * Perform the appropriate triplet combination function for the current
	 * iteration
	 *
	 * 返回对应F函数的值
	 *
	 */
	function sha1_ft(t, b, c, d){
	 
	    if (t < 20) 
	        return (b & c) | ((~ b) & d);
	     
	    if (t < 40) 
	        return b ^ c ^ d;
	     
	    if (t < 60) 
	        return (b & c) | (b & d) | (c & d);
	     
	    return b ^ c ^ d; // t<80
	}
	 
	/*
	 *
	 * Determine the appropriate additive constant for the current iteration
	 *
	 * 返回对应的Kt值
	 *
	 */
	function sha1_kt(t){
	 
	    return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
	     
	}
	 
	/*
	 *
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 *
	 * to work around bugs in some JS interpreters.
	 *
	 * 将32位数拆成高16位和低16位分别进行相加，从而实现 MOD 2^32 的加法
	 *
	 */
	function safe_add(x, y){
	 
	    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	     
	    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	     
	    return (msw << 16) | (lsw & 0xFFFF);
	     
	}
	 
	/*
	 *
	 * Bitwise rotate a 32-bit number to the left.
	 *
	 * 32位二进制数循环左移
	 *
	 */
	function rol(num, cnt){
	 
	    return (num << cnt) | (num >>> (32 - cnt));
	     
	}
	 
	/*
	 *
	 * The standard SHA1 needs the input string to fit into a block
	 *
	 * This function align the input string to meet the requirement
	 *
	 */
	function AlignSHA1(str){
	 
	    var nblk = ((str.length + 8) >> 6) + 1, blks = new Array(nblk * 16);
	     
	    for (var i = 0; i < nblk * 16; i++) 
	        blks[i] = 0;
	     
	    for (i = 0; i < str.length; i++) 
	     
	        blks[i >> 2] |= str.charCodeAt(i) << (24 - (i & 3) * 8);
	     
	    blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);
	     
	    blks[nblk * 16 - 1] = str.length * 8;
	     
	    return blks;
	     
	}
	 
	/*
	 *
	 * Convert an array of big-endian words to a hex string.
	 *
	 */
	function binb2hex(binarray){
	 
	    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	     
	    var str = "";
	     
	    for (var i = 0; i < binarray.length * 4; i++) {
	     
	        str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
	         
	        hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
	         
	    }
	     
	    return str;
	     
	}
	 
	/*
	 *
	 * calculate MessageDigest accord to source message that inputted
	 *
	 */
	function calcDigest(){
	 
	    var digestM = hex_sha1(document.SHAForm.SourceMessage.value);
	     
	    document.SHAForm.MessageDigest.value = digestM;
	     
	}
	if (!strings) {
		return false;
	}
	return hex_sha1(strings);
}
//sha256 加密
/**
*
* Secure Hash Algorithm (SHA256)
* http://www.webtoolkit.info/
*
* Original code by Angel Marin, Paul Johnston.
*
**/
function SHA256(s){
  var chrsz = 8;
  var hexcase = 0;
  function safe_add (x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }
  function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
  function R (X, n) { return ( X >>> n ); }
  function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
  function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
  function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
  function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
  function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
  function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
  function core_sha256 (m, l) {
    var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
    var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >> 9) << 4) + 15] = l;
    for ( var i = 0; i<m.length; i+=16 ) {
      a = HASH[0];
      b = HASH[1];
      c = HASH[2];
      d = HASH[3];
      e = HASH[4];
      f = HASH[5];
      g = HASH[6];
      h = HASH[7];
      for ( var j = 0; j<64; j++) {
        if (j < 16) W[j] = m[j + i];
        else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
        T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
        T2 = safe_add(Sigma0256(a), Maj(a, b, c));
        h = g;
        g = f;
        f = e;
        e = safe_add(d, T1);
        d = c;
        c = b;
        b = a;
        a = safe_add(T1, T2);
      }
      HASH[0] = safe_add(a, HASH[0]);
      HASH[1] = safe_add(b, HASH[1]);
      HASH[2] = safe_add(c, HASH[2]);
      HASH[3] = safe_add(d, HASH[3]);
      HASH[4] = safe_add(e, HASH[4]);
      HASH[5] = safe_add(f, HASH[5]);
      HASH[6] = safe_add(g, HASH[6]);
      HASH[7] = safe_add(h, HASH[7]);
    }
    return HASH;
  }
  function str2binb (str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < str.length * chrsz; i += chrsz) {
      bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
    }
    return bin;
  }
  function Utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }
  function binb2hex (binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for(var i = 0; i < binarray.length * 4; i++) {
      str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
      hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8 )) & 0xF);
    }
    return str;
  }
  s = Utf8Encode(s);
  return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}
function sha256(strings){
	return strings? SHA256(strings) : false;
}

//ajax操作
function plug_ajax(){
	(typeof window.is_array !="function")&&(window.is_array=function(argument){
		return argument && (typeof argument==="object") && ("length" in argument) ? true : false ;//检测是否是数组
	});
	(typeof window.is_object !="function")&&(window.is_object=function(argument){
		return argument && (typeof argument==="object") && !("length" in argument) ? true : false ;//检测是否是对象
	});
	(typeof window.foreach !="function")&&(window.foreach=function(array_or_json,fun){
		if (is_array(array_or_json)) {
			if (typeof fun==="function") {
				for(var i=0,len=array_or_json.length;i<len;i++){
					fun(array_or_json,i,array_or_json[i]);
				}				
			}
	
		}
		if (is_object(array_or_json)) {
			if (typeof fun==="function") {
				for(var att in array_or_json){
					fun(array_or_json,att,array_or_json[att]);
				}
			}
		}
	});
	if (arguments.length>0) {
		for(var i=0,len=arguments.length;i<len;i++){
			if (typeof arguments[i]==="function") {
				arguments[i].call(this);
			}
			if (typeof arguments[i]==="object" && !("length" in arguments[i])) {
				for(var att in arguments[i]){
					this[att]=arguments[i][att];
				}
			}
		}
	}
}
plug_ajax.prototype={
	//把字符串转换为一个json格式
	//a1<=>1<,>a2<=>2 转换为 {a1:"1",a2:"2"}
	STR_JSON:function(strings,mode_json){
		if (!strings) {return;}
		(!mode_json)&&(mode_json={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
		});
		var keyName_keyValue=mode_json.key,
			_json=mode_json.json;
		var json={};
		var arrStr=strings.split(_json);
		foreach(arrStr,function(arr,key,value){
			var a_str=value.split(keyName_keyValue);
			json[a_str[0]]=a_str[1];
		});
		return json;
	}
	//把字符串转换为一个数组json格式
	//a1<=>1<,>a2<=>2<#>a01<=>01<,>a02<=>02 转化为 [{a1:"1",a2:"2"},{a01:"01",a02:"02"}]
	,STR_ARR_JSON:function(strings,mode_json){
		var _this=this;
		if (!strings) {return;}
		//strings=strings.replace(/(\r\n|\r|\n)/g," ");
		(!mode_json)&&(mode_json={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
			//"<#>"把多个json字符串分割开（数组）
			,arr:"<#>"
		});
		var kName_kValue=mode_json.key,
			json=mode_json.json,
			arr=mode_json.arr;
		var arr_json=[];
		var arr_json_str=strings.split(arr);
		foreach(arr_json_str,function(arr,key,value){
			arr_json[key]=_this.STR_JSON(value,mode_json);
		});
		return arr_json;
	}
	//解码json数据 跟 STR_JSON方法（函数）一样
	,de_str_json:function(strings,mode_json){
		(!mode_json)&&(mode_json={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
		});
		return this.STR_JSON(strings,mode_json);
	}
	//解码数组json数据 跟 STR_ARR_JSON（函数）方法一样
	,de_str_arr_json:function(strings,mode_json){
		(!mode_json)&&(mode_json={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
			//"<#>"把多个json字符串分割开（数组）
			,arr:"<#>"
		});
		return this.STR_ARR_JSON(strings,mode_json);
	}
	//编码json数据
	,en_str_json:function(json,config){
		if (!is_object(json)) {
			return false;
		}
		(!is_object(config))&&(config={
			key:"<=>"
			,json:"<,>"
		});
		var str_json="";
		foreach(json,function(json,k,v){
			str_json += k + config.key + v + config.json;
		})
		var str_json_len=str_json.length,
			c_json_len=config.json.length;
		return str_json.substr(0,str_json_len-c_json_len);

	}
	//编码数组json数据
	,en_str_arr_json:function(arr2_json,config){
		var _this=this;
		if (!is_array(arr2_json)) {
			return ;
		}
		(!is_object(config))&&(config={
			key:"<=>"
			,json:"<,>"
			,arr:"<#>"
		});
		var str_arr_json="";
		foreach(arr2_json,function(arr,key,value){
			str_arr_json+=_this.en_str_json(value,config)+config.arr;
		});
		var str_arr_json_len=str_arr_json.length,
			c_arr_len=config.arr.length;
		return str_arr_json.substr(0,str_arr_json_len - c_arr_len);
	}
	//解码二维json数据字符串 如：ab2<==>ab1<=>ab<,,>ab2<==>cd1<=>ab<,,>ab3<==>cd1<=>abc转换为 {ab2:[{ab1:"ab"},{cd1:"ab"}],ab3:{cd1:"abc"}}
	,de_str_json2:function(strings,config){
		if (!strings) {return;}
		(!config)&&(config={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
			,arr:"<#>"
			//"<==>"左边为键名，右边为键值
			,key2:"<==>"
			//"<,,>"把多个键名和键值字符串分割开
			,json2:"<,,>"
		});
		var json2={},_this=this;
		var m=eval("/"+config.arr+"/g");
		var arr=strings.split(config.json2);
		foreach(arr,function(arr,key,value){
			var ar=value.split(config.key2);
			//属性重复的时候值为数组(二维)
			if (ar[0] in json2) {
				if (is_array(json2[ar[0]])) {
					json2[ar[0]].push(m.test(ar[1])? _this.de_str_arr_json(ar[1],config) :_this.de_str_json(ar[1],config));
				}
				else{
					if (is_object(json2[ar[0]])) {
						var init_value=json2[ar[0]];
					}
					json2[ar[0]]=[
									init_value
									,m.test(ar[1])? _this.de_str_arr_json(ar[1],config) :_this.de_str_json(ar[1],config)
								];
				}
			}
			else{
				json2[ar[0]]= m.test(ar[1])? _this.de_str_arr_json(ar[1],config) :_this.de_str_json(ar[1],config) ;
			}
			

		});
		return json2;
	}
	//编码二维json数据字符串
	,en_str_json2:function(obj,config){
		if (!is_object(obj)) {return;}
		(!config)&&(config={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
			,arr:"<#>"
			//"<==>"左边为键名，右边为键值
			,key2:"<==>"
			//"<,,>"把多个键名和键值字符串分割开
			,json2:"<,,>"
		});
		var json2str="";
		_this=this;
		foreach(obj,function(obj,key,value){
			var strs=is_array(value)? _this.en_str_arr_json(value,config) : _this.en_str_json(value,config);
			json2str+=key+config.key2+strs+config.json2;
		});
		c_json2_len=config.json2.length;
		json2str_len=json2str.length;
		return json2str.substr(0,json2str_len - c_json2_len);
	}
	,get_files:function(ele_file_2arr){
		var file_arr=[],j=0;
		if (ele_file_2arr && typeof ele_file_2arr==="object") {
			for(var i=0,len=ele_file_2arr.length;i<len;i++){
				if (ele_file_2arr[i] && typeof ele_file_2arr[i]==="object" && ele_file_2arr[i].length>0) {
					for(var k=0,leng=ele_file_2arr[i].length;k<leng;k++){
						file_arr[j]=ele_file_2arr[i][k];
						j++;
					}
				}
				else{
					if (ele_file_2arr[i] && typeof ele_file_2arr[i]==="object") {
						file_arr[j]=ele_file_2arr[i];
						j++;
					}	
				}
			}
			return file_arr;//一维数组
		}

	}
	,upload_files:function(file_obj_arr,fixed_keyname,url,fun){
		(!fixed_keyname) && (fixed_keyname="file");
		var form_data=new FormData();
		if (file_obj_arr && typeof file_obj_arr==="object" && typeof fixed_keyname!=="number") {
			var len=file_obj_arr.length;
			for(var i=0;i<len;i++){
				form_data.append(fixed_keyname+i,file_obj_arr[i]);
			}
			var xhr=new XMLHttpRequest();
			xhr.open("post",url,true);
			xhr.onreadystatechange=function(e){
				if (this.readyState==4&&this.status>=200) {
					var texts=this.responseText;
					fun && fun.call(this,texts);
				}
			}
			xhr.send(form_data);
		}
	}
	//异步请求
	,ajax:function(json,fun){
		//json.method-->post,get   json.action:处理地址 json.data:处理数据（get）
		if(!is_object(json)){
			json={
				 action:""
				,method:"post"
				,get:{}
				,post:{}
			};
		}
		(!json.method)&&(json.method="post");
		var get="?";
		get+=this.en_str_json(json.get,{key:"=",json:"&"});
		var xhr=new XMLHttpRequest();
		xhr.open(json.method,json.action+get,true);
		if (json.method==="post"||json.method==="POST") {
			//设置请求头部信息
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			//发送数据（字符串）格式为：xx1=yy1&xx2=yy2 这样的字符串格式
			xhr.send(this.en_str_json(json.post,{key:"=",json:"&"}));
		}
		else{
			xhr.send();
		}
		console.log(this.en_str_json(json.post,{key:"=",json:"&"}));
		xhr.onreadystatechange=function(e){
			if(this.readyState==4&&this.status>=200){
				var texts=this.responseText;
				(typeof fun==="function")&&(fun.call(this,texts));
			}
		}

	}
	,GET:function(config){
		if (!is_object(config)) {
			config={
				key:"="
				,json:"&"
			};
		}
		var urlStr=decodeURIComponent(location.href);
		if (/\?/i.test(urlStr)) {
			//取右边部分
			var urlStr=urlStr.split("?")[1];
			return this.de_str_json(urlStr,{key:config.key,json:config.json});
		}
		else{
			return false;
		}

	}
};

//dom操作
function plug_dom(){
	window.is_array=function(argument){
		return argument && (typeof argument==="object") && ("length" in argument) ? true : false ;//检测是否是数组
	}
	window.is_object=function(argument){
		return argument && (typeof argument==="object") && !("length" in argument) ? true : false ;//检测是否是对象
	}
	//回调函数要三个参数表示： 数组（或对象）,下标（key），value
	window.foreach=function(array_or_json,fun){
		if (is_array(array_or_json)) {
			if (typeof fun==="function") {
				for(var i=0,len=array_or_json.length;i<len;i++){
					fun(array_or_json,i,array_or_json[i]);
				}				
			}
	
		}
		if (is_object(array_or_json)) {
			if (typeof fun==="function") {
				for(var att in array_or_json){
					fun(array_or_json,att,array_or_json[att]);
				}
			}
		}
	}

	if (arguments.length>0) {
		for(var i=0,len=arguments.length;i<len;i++){
			if (typeof arguments[i]==="function") {
				arguments[i].call(this);
			}
			if (typeof arguments[i]==="object" && !("length" in arguments[i])) {
				for(var att in arguments[i]){
					this[att]=arguments[i][att];
				}
			}
		}
	}
}
plug_dom.prototype={
	/*获取元素
	*参数：获取元素的范围(默认document),对象属性名,对象属性值,是否自定义属性,元素名称(标签名)
	*/
	getElements:function(range,attribute_name,attribute_value,is_myAtt,element_name){
		var arr_ele=[];
		(!range)&&(range=document);
		if (element_name) {
			return range.getElementsByTagName(element_name);
		}
		else{
			var elements=range.getElementsByTagName('*');
			if (is_myAtt==true||is_myAtt==1) {
				for(var i=0,len=elements.length,j=0;i<len;i++){
					if (elements[i]["dataset"][attribute_name]==attribute_value) {
						arr_ele[j]=elements[i];
						j++;
					}
				}
			}
			else{
				for(var i=0,j=0,len=elements.length;i<len;i++){
					if (elements[i][attribute_name]==attribute_value) {
						arr_ele[j]=elements[i];
						j++;
					}
				}
			}
		}
		return arr_ele;
	}
	/*设置对象属性名和属性值
	*参数：对象,json格式(如{xx:{},xxx:"xxx"})
	*/
	,set_obj_att:function(obj,json_att){
		if (obj && (typeof json_att=="object")) {
			for(var att in json_att){
				if (typeof json_att[att]=="object") {
					//obj[att]={};
					this.set_obj_att(obj[att],json_att[att]);
				}
				else{
					obj[att]=json_att[att];
				}
			}
		}
	}
	/*插入元素
	*参数：父元素对象,元素名,设置元素属性和属性值,插入的参照位置(值可以为空),回调函数(值可以为空)
	*/
	,insertElement:function(parentElement,element_name,ele_att,refer_node,fun){
		if (parentElement&&element_name) {
			var E=document.createElement(element_name);
			this.set_obj_att(E,ele_att);
			(fun&&typeof fun=="function")&&(fun(E,this));
			refer_node ? parentElement.insertBefore(E,refer_node) : parentElement.appendChild(E);
			return true;
		}
		else{
			return false;
		}
	}
	,EventListener:{
		add:function(listener_obj,event_type,fun){
			if (listener_obj.addEventListener) {
				listener_obj.addEventListener(event_type,fun,false);
			}
			else if (listener_obj.attachEvent) {
				listener_obj.attachEvent("on"+event_type,fun);
			}
			else{
				listener_obj["on"+event_type]=fun; //阻止默认事件在fun函数里直接返回false: return false;
			}
		}
		,remove:function(listener_obj,event_type,fun){
			if(listener_obj.removeEventListener){
				listener_obj.removeEventListener(event_type,fun,false);
			}
			else if (listener_obj.detachEvent) {
				listener_obj.detachEvent("on"+event_type,fun);
			}
			else{
				listener_obj["on"+event_type]=null;
			}	
		}
		,getEvent:function(e){
			if (e) {
				return e||window.event;
			}
			else{
				return false;
			}
		}
		,getTarget:function(e){
			if (e) {
				return e.target||e.srcElement;
			}
			else{
				return false;
			}
		}
		,preventDefault:function(e){
			if (e.preventDefault) {
				e.preventDefault();
			}
			else{
				e.returnValue=false;
			}
		}
	}
	,ajax:function(json,fun,form_ele,fn){
		//json.method-->post,get   json.action:处理地址 json.data:处理数据（get）
		if (!is_object(json)) {
			return false;
		}
		var data="?";
		
		if (is_object(json.data)) {
			//console.log(json.data)
			foreach(json.data,function(obj,key,value){
				data+=key+"="+value+"&";

			});
			data=data.substr(0,data.length-1);
		}
		//console.log(data)
		var xhr=new XMLHttpRequest();
		xhr.open(json.method,json.action+data,true);
		xhr.onreadystatechange=function(e){
			if(this.readyState==4&&this.status>=200){
				var texts=this.responseText;
				(typeof fun==="function")&&(fun(texts));
			}
		}
		if (is_object(form_ele)) {
			xhr.send(new FormData(form_ele));
			return;
		}
		if (typeof fn==="function") {
			var form_data=new FormData();
			fn.call(this,form_data);
			xhr.send(form_data);
			return;
		}
		//form_ele ? xhr.send(new FormData(form_ele)) : xhr.send();
		xhr.send(new FormData(form_ele));
	}
	//异步post
	,ajax_post:function(json,fun){
		//json.method-->post,get   json.action:处理地址 json.data:处理数据（get）
		if(!is_object(json)){
			json={
				 action:""
				,get:{}
				,post:{}
			};
		}
		json.method="post";
		var get="?";
		get+=this.en_str_json(json.get,{key:"=",json:"&"});
		var xhr=new XMLHttpRequest();
		xhr.open(json.method,json.action+get,true);
		//设置请求头部
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		//发送数据（字符串）格式为：xx1=yy1&xx2=yy2 这样的字符串格式
		xhr.send(this.en_str_json(json.post,{key:"=",json:"&"}));
		console.log(this.en_str_json(json.post,{key:"=",json:"&"}));
		xhr.onreadystatechange=function(e){
			if(this.readyState==4&&this.status>=200){
				var texts=this.responseText;
				(typeof fun==="function")&&(fun.call(this,texts));
			}
		}

	}
	//regular 正则表达式或字符
	,GET:function(regular){
		var urlStr=location.href,arr=[];
		if (/\?/i.test(urlStr)) {
			urlStr=urlStr.split("?")[1];
			if (is_object(regular)||(typeof regular==="string")) {
				arr=urlStr.split(regular);
			}
			else{
				arr=urlStr.split("&");
			}
			var json={};
			for(var i=0,len=arr.length;i<len;i++){
				var a_st=arr[i].split("=");
				json[a_st[0]]=a_st[1];
			}
			return json;
		}
		else{
			return false;
		}
	}
	//把字符串转换为一个json格式
	//a1<=>1<,>a2<=>2 转换为 {a1:"1",a2:"2"}
	,STR_JSON:function(strings,mode_json){
		if (!strings) {return;}
		(!mode_json)&&(mode_json={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
		});
		var keyName_keyValue=mode_json.key,
			_json=mode_json.json;
		var json={};
		var arrStr=strings.split(_json);
		foreach(arrStr,function(arr,key,value){
			var a_str=value.split(keyName_keyValue);

			var l=a_str.length;
			if (l>2) {
				var _str="";
				for(var i=2;i<l;i++){
					_str+=mode_json.key+a_str[i];
				}
				json[a_str[0]]=a_str[1]+_str;
			}
			else{
				json[a_str[0]]=a_str[1];
			}
				
		});
		return json;
	}
	//把字符串转换为一个数组json格式
	//a1<=>1<,>a2<=>2<#>a01<=>01<,>a02<=>02 转化为 [{a1:"1",a2:"2"},{a01:"01",a02:"02"}]
	,STR_ARR_JSON:function(strings,mode_json){
		var _this=this;
		if (!strings) {return;}
		//strings=strings.replace(/(\r\n|\r|\n)/g," ");
		(!mode_json)&&(mode_json={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
			//"<#>"把多个json字符串分割开（数组）
			,arr:"<#>"
		});
		var kName_kValue=mode_json.key,
			json=mode_json.json,
			arr=mode_json.arr;
		var arr_json=[];
		var arr_json_str=strings.split(arr);
		foreach(arr_json_str,function(arr,key,value){
			arr_json[key]=_this.STR_JSON(value,mode_json);
		});
		return arr_json;
	}
	//解码json数据 跟 STR_JSON方法（函数）一样
	,de_str_json:function(strings,mode_json){
		(!mode_json)&&(mode_json={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
		});
		return this.STR_JSON(strings,mode_json);
	}
	//解码数组json数据 跟 STR_ARR_JSON（函数）方法一样
	,de_str_arr_json:function(strings,mode_json){
		(!mode_json)&&(mode_json={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
			//"<#>"把多个json字符串分割开（数组）
			,arr:"<#>"
		});
		return this.STR_ARR_JSON(strings,mode_json);
	}
	//编码json数据
	,en_str_json:function(json,config){
		if (!is_object(json)) {
			return false;
		}
		(!is_object(config))&&(config={
			key:"<=>"
			,json:"<,>"
		});
		var str_json="";
		foreach(json,function(json,k,v){
			str_json += k + config.key + v + config.json;
		})
		var str_json_len=str_json.length,
			c_json_len=config.json.length;
		return str_json.substr(0,str_json_len-c_json_len);

	}
	//编码数组json数据
	,en_str_arr_json:function(arr2_json,config){
		var _this=this;
		if (!is_array(arr2_json)) {
			return ;
		}
		(!is_object(config))&&(config={
			key:"<=>"
			,json:"<,>"
			,arr:"<#>"
		});
		var str_arr_json="";
		foreach(arr2_json,function(arr,key,value){
			str_arr_json+=_this.en_str_json(value,config)+config.arr;
		});
		var str_arr_json_len=str_arr_json.length,
			c_arr_len=config.arr.length;
		return str_arr_json.substr(0,str_arr_json_len - c_arr_len);
	}
	//解码二维json数据字符串 如：ab2<==>ab1<=>ab<,,>ab2<==>cd1<=>ab<,,>ab3<==>cd1<=>abc转换为 {ab2:[{ab1:"ab"},{cd1:"ab"}],ab3:{cd1:"abc"}}
	,de_str_json2:function(strings,config){
		if (!strings) {return;}
		(!config)&&(config={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
			,arr:"<#>"
			//"<==>"左边为键名，右边为键值
			,key2:"<==>"
			//"<,,>"把多个键名和键值字符串分割开
			,json2:"<,,>"
		});
		var json2={},_this=this;
		var m=eval("/"+config.arr+"/g");
		var arr=strings.split(config.json2);
		foreach(arr,function(arr,key,value){
			var ar=value.split(config.key2);
			//属性重复的时候值为数组(二维)
			if (ar[0] in json2) {
				if (is_array(json2[ar[0]])) {
					json2[ar[0]].push(m.test(ar[1])? _this.de_str_arr_json(ar[1],config) :_this.de_str_json(ar[1],config));
				}
				else{
					if (is_object(json2[ar[0]])) {
						var init_value=json2[ar[0]];
					}
					json2[ar[0]]=[
									init_value
									,m.test(ar[1])? _this.de_str_arr_json(ar[1],config) :_this.de_str_json(ar[1],config)
								];
				}
			}
			else{
				json2[ar[0]]= m.test(ar[1])? _this.de_str_arr_json(ar[1],config) :_this.de_str_json(ar[1],config) ;
			}
			

		});
		return json2;
	}
	//编码二维json数据字符串
	,en_str_json2:function(obj,config){
		if (!is_object(obj)) {return;}
		(!config)&&(config={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
			,arr:"<#>"
			//"<==>"左边为键名，右边为键值
			,key2:"<==>"
			//"<,,>"把多个键名和键值字符串分割开
			,json2:"<,,>"
		});
		var json2str="";
		_this=this;
		foreach(obj,function(obj,key,value){
			var strs=is_array(value)? _this.en_str_arr_json(value,config) : _this.en_str_json(value,config);
			json2str+=key+config.key2+strs+config.json2;
		});
		c_json2_len=config.json2.length;
		json2str_len=json2str.length;
		return json2str.substr(0,json2str_len - c_json2_len);
	}
};
new plug_dom();
/*
obj=dom.de_str_json2("ab2<==>ab1<=>ab<,,>ab2<==>cd1<=>ab<,>cdd1<=>abdds<,,>ab2<==>cd23<=>ab<,,>fang<==>fangwenfeng<=>fangjsojdfoiwj")
*/

//动画
function plug_move(){
/*
*t  当前时间 (time) 初始时间
*b  初始位置 (beginning position)		(固定)
*c  距离 (change position) 运动的距离	(固定)
*d  持续时间 (duration)运动多少时间		(固定)
*p  最终位置 (position)
*/	
	var _obj=this;
	this.getCSS=function(obj,style_attr){
		return window.getComputedStyle ? getComputedStyle(obj)[style_attr] : obj.currentStyle[style_attr] ;
	}
	this.move_time={
		/*
		*tween算法 (基于时间的动画)
		*/
		linear:function(t,b,c,d){ 			//匀速
			return c*t/d + b; //kx+b
		}
	    ,easeIn: function(t, b, c, d){  	//加速曲线 ease前进的意思
	        return c*(t/=d)*t + b;
	    }
	    ,easeOut: function(t, b, c, d){  	//减速曲线
	        return -c *(t/=d)*(t-2) + b;
	    }
	    ,easeBoth: function(t, b, c, d){  	//加速减速曲线
	        if ((t/=d/2) < 1) {
	            return c/2*t*t + b;
	        }
	        return -c/2 * ((--t)*(t-2) - 1) + b;
	    }
	    ,easeInStrong: function(t, b, c, d){  //加加速曲线
	        return c*(t/=d)*t*t*t + b;
	    }
	    ,easeOutStrong: function(t, b, c, d){  //减减速曲线
	        return -c * ((t=t/d-1)*t*t*t - 1) + b;
	    }
	    ,easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
	        if ((t/=d/2) < 1) {
	            return c/2*t*t*t*t + b;
	        }
	        return -c/2 * ((t-=2)*t*t*t - 2) + b;
	    }
	    ,elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
	        if (t === 0) { 
	            return b; 
	        }
	        if ( (t /= d) == 1 ) {
	            return b+c; 
	        }
	        if (!p) {
	            p=d*0.3; 
	        }
	        if (!a || a < Math.abs(c)) {
	            a = c; 
	            var s = p/4;
	        } else {
	            var s = p/(2*Math.PI) * Math.asin (c/a);
	        }
	        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	    }
	    ,elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
	        if (t === 0) {
	            return b;
	        }
	        if ( (t /= d) == 1 ) {
	            return b+c;
	        }
	        if (!p) {
	            p=d*0.3;
	        }
	        if (!a || a < Math.abs(c)) {
	            a = c;
	            var s = p / 4;
	        } else {
	            var s = p/(2*Math.PI) * Math.asin (c/a);
	        }
	        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	    }
	    ,elasticBoth: function(t, b, c, d, a, p){
	        if (t === 0) {
	            return b;
	        }
	        if ( (t /= d/2) == 2 ) {
	            return b+c;
	        }
	        if (!p) {
	            p = d*(0.3*1.5);
	        }
	        if ( !a || a < Math.abs(c) ) {
	            a = c; 
	            var s = p/4;
	        }
	        else {
	            var s = p/(2*Math.PI) * Math.asin (c/a);
	        }
	        if (t < 1) {
	            return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
	                    Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	        }
	        return a*Math.pow(2,-10*(t-=1)) * 
	                Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	    }
	    ,backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
	        if (typeof s == 'undefined') {
	           s = 1.70158;
	        }
	        return c*(t/=d)*t*((s+1)*t - s) + b;
	    }
	    ,backOut: function(t, b, c, d, s){
	        if (typeof s == 'undefined') {
	            s = 3.70158;  //回缩的距离
	        }
	        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	    }
	    ,backBoth: function(t, b, c, d, s){
	        if (typeof s == 'undefined') {
	            s = 1.70158; 
	        }
	        if ((t /= d/2 ) < 1) {
	            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
	        }
	        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	    }
	    ,bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
	        return c - this['bounceOut'](d-t, 0, c, d) + b;
	    }       
	    ,bounceOut: function(t, b, c, d){
	        if ((t/=d) < (1/2.75)) {
	            return c*(7.5625*t*t) + b;
	        } else if (t < (2/2.75)) {
	            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
	        } else if (t < (2.5/2.75)) {
	            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
	        }
	        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	    }      
	    ,bounceBoth: function(t, b, c, d){
	        if (t < d/2) {
	            return this['bounceIn'](t*2, 0, c, d) * 0.5 + b;
	        }
	        return this['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	    }
	    /*调用该函数 方法（move）执行动画*/
		,move:function(obj,json_att,times,mode,is_scroll,fun){
			(!times)&&(times=500);
			(!mode)&&(mode="easeOut");
			if ((!obj && !json_att) && typeof obj!="object" && typeof json_att!="object") {return false;}
			//var previous=new Date();//以前的时间
			var current=new Date();//现在的时间
			/*获取初始值*/
			var iCur={};
			for(var att in json_att){
				if (is_scroll) {/*滚动条*/
					iCur[att]=obj[att];
				}
				else{
					att==="opacity" ? iCur[att] = Math.round(_obj.getCSS(obj,att)*100) : iCur[att] = parseInt(_obj.getCSS(obj,att));
				}
			}
			/*先清除上一个定时器*/
			//clearTimeout(this.Timeout);
			clearInterval(obj.Timeout);
			this.m=function(){
				/*获取t、d参数*/
				var d=times;
				var t=d-Math.max(0,current-(+new Date())+d);
				for(var attr in json_att){
					/*获取b、c、p这三个参数*/
					var b=iCur[attr];
					var c=json_att[attr]-iCur[attr];
					var p=_obj.move_time[mode](t,b,c,d);
					/*赋值操作*/
					if (is_scroll) {
						obj[attr]=p;
					}
					else{
						if (attr=="opacity") {
							obj.style.opacity = p / 100;
							 obj.style.filter = 'alpha(opacity=' + p + ')';
						}
						else{
							 obj.style[attr] = p + 'px';
						}
					}

				}
				//obj.Timeout=setInterval(this.m,1000/60);
				//console.log(times,t,d);
				if (t==d) {
					/*清除定时器*/
					clearInterval(obj.Timeout);
					fun && fun.call(obj);
				}			
			}
			//this.Timeout=setTimeout(this.m,1000/60);
			obj.Timeout=setInterval(this.m,1000/60);
			//this.m.call(this);
		}
	};
	this.move=function(obj,json_att,times,mode,is_scroll,fun){
		this.move_time.move(obj,json_att,times,mode,is_scroll,fun);
	}

}
/*函数里面的函数 里面的this默认指向window对象*/

//时间日期格式
function plug_date(){
	this.time=new Date();
}
plug_date.prototype={
	//time:new Date()
	getYear:function(mode){
		return mode ? this.time.getYear() : this.time.getFullYear();
	}
	,getMonth:function(){
		return this.time.getMonth()+1;
	}
	,getDate:function(){
		return this.time.getDate();
	}
	,getDay:function(){
		return this.time.getDay();//星期几 0为星期日，1为星期一...
	}
	,getHours:function(mode){//时
		return (mode&&this.time.getHours>12) ? this.time.getHours()-12 : this.time.getHours();//默认24小时制
	}
	,getMinutes:function(){//分
		return this.time.getMinutes()<10 ? "0"+this.time.getMinutes() : this.time.getMinutes();
	}
	,getSeconds:function(){//秒
		return this.time.getSeconds()<10 ? "0"+this.time.getSeconds() : this.time.getSeconds();
	}
	,format:function(format,language){
		var day_ch=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
		var day_en=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		if (format) {
			format=format.replace(/Y/i,this.getYear());
			format=format.replace(/y/i,this.getYear(true));
			format=this.getMonth()>9 ? format.replace(/(M|m)/i,this.getMonth()) : format.replace(/(M|m)/i,"0"+this.getMonth());
			//format=this.getMonth()>9 ? format.replace(/m/i,this.getMonth()) : format.replace(/m/i,"0"+this.getMonth());
			format=this.getDate()>9  ? format.replace(/D/i,this.getDate())  : format.replace(/D/i,"0"+this.getDate());
			format=this.getHours()>9 ? format.replace(/H/i,this.getHours()) : format.replace(/H/i,"0"+this.getHours());
			format=format.replace(/h/i,this.getHours(true));
			format= format.replace(/(I|i)/i,this.getMinutes());
			//format= format.replace(/i/i,this.getMinutes());
			format= format.replace(/(S|s)/i,this.getSeconds());
			//format= format.replace(/s/i,this.getSeconds());
			format= language ? format.replace(/d/i,day_en[this.getDay()]) : format.replace(/d/i,day_ch[this.getDay()]) ;
			return format;
		}
		else{
			return false;
		}
	}
	,timer:function(time_str){
		if (time_str&&/\:/i.test(time_str)) {
			var arr=time_str.split(":");
			var h=parseInt(arr[0]),i=parseInt(arr[1]),s=parseInt(arr[2]);
			s++;
			(s>59)&&(i++)&&(s=0);
			(i>59)&&(h++)&&(i=0);
			(h>23)&&(location.reload());
			h= h<10 ? "0"+h : h;
			i= i<10 ? "0"+i : i;
			s= s<10 ? "0"+s : s;
			return h+":"+i+":"+s;
		}
		else{
			return false;
		}
	}
};

//获取特定标记内的内容
function plug_temp(){
	if (arguments.length>0) {
		for(var i=0,len=arguments.length;i<len;i++){
			if (typeof arguments[i]==="function") {
				arguments[i].call(this);
			}
			if (typeof arguments[i]==="object" && !("length" in arguments[i])) {
				for(var att in arguments[i]){
					this[att]=arguments[i][att];
				}
			}
		}
	}
}
plug_temp.prototype={
	replaceStr:function(arr_str,mode){
		var getArr;
		foreach(arr_str,function(arr,key,value){
			arr[key]=value.replace(mode,"");
			getArr=arr;
		});
		return getArr;
	}
	//去标记部分
	,getContent:function(strings,tag,mytag_json){
		(!strings)&&(strings=document.getElementsByTagName('html')[0].innerHTML);
		if (is_object(mytag_json)) {
			var tags=eval("/"+mytag_json.l+".+?"+mytag_json.r+"/g");
			var arr=strings.match(tags);
			return [
				this.replaceStr(arr,eval("/("+mytag_json.l+"|"+mytag_json.r+")/g"))
			];
		}
		var tag1=/{{.+?}}/g;
		var tag2=/<<<.+?>>>/g;
		var tag3=/<#.+?#>/g;
		var tag4=/<temp>.+?<\/temp>/g;
		var tag5=/<get>.+?<\/get>/g;
		switch(true){
			case tag==="<<<|>>>":
				var arr=strings.match(tag2);
				return this.replaceStr(arr,/(<<<|>>>)/g);
			break;
			case tag==="<#|#>":
				var arr=strings.match(tag3);
				return this.replaceStr(arr,/(<#|#>)/g);
			break;
			case tag==="<temp>|</temp>":
				var arr=strings.match(tag4);
				return this.replaceStr(arr,/(<temp>|<\/temp>)/g);
			break;
			case tag==="<get>|</get>":
				var arr=strings.match(tag5);
				return this.replaceStr(arr,/(<get>|<\/get>)/g);
			break;
			default:
			//{{|}}
				var arr=strings.match(tag1);
				return this.replaceStr(arr,/({{|}})/g);
			break;
		}
	}
	//不去标记字符
	,getContentAll:function(strings,tag,mytag_json){
		(!strings)&&(strings=document.getElementsByTagName('html')[0].innerHTML);
		if (is_object(mytag_json)) {
			var tags=eval("/"+mytag_json.l+".+?"+mytag_json.r+"/g");
			var arr=strings.match(tags);
			return [
				arr
			];
		}
		var tag1=/{{.+?}}/g;
		var tag2=/<<<.+?>>>/g;
		var tag3=/<#.+?#>/g;
		var tag4=/<temp>.+?<\/temp>/g;
		var tag5=/<get>.+?<\/get>/g;
		switch(true){
			case tag==="<<<|>>>":
				var arr=strings.match(tag2);
				return this.replaceStr(arr,/(<<<|>>>)/g);
			break;
			case tag==="<#|#>":
				var arr=strings.match(tag3);
				return arr;
			break;
			case tag==="<temp>|</temp>":
				var arr=strings.match(tag4);
				return arr;
			break;
			case tag==="<get>|</get>":
				var arr=strings.match(tag5);
				return arr
			break;
			default:
			//{{|}}
				var arr=strings.match(tag1);
				//this.replaceStr(arr,/({{|}})/g);
				return arr;
			break;
		}
	}
};
/*
*如：获取字符串"<<<123456789>>>"里面的"<<<"与">>>"之间的内容
var st="<<<123456789>>>5454785";
var temp=new plug_temp();
temp.getContent(t,0,{l:"<<<",r:">>>"});
*/

//cookie操作
function plug_cookie(){
	if (arguments.length>0) {
		for(var i=0,len=arguments.length;i<len;i++){
			if (typeof arguments[i]==="function") {
				arguments[i].call(this);
			}
			if (typeof arguments[i]==="object" && !("length" in arguments[i])) {
				for(var att in arguments[i]){
					this[att]=arguments[i][att];
				}
			}
		}
	}
}
plug_cookie.prototype={
	//设置单个cookie
	setCookie:function(c_key,value,time,dir){
		var t=new Date();
		var Day= time && typeof time ==="number" ? time : 7 ;
		t.setTime(t.getTime()+Day*24*60*60*1000);
		document.cookie= 	dir ? c_key+"="+value+";expires="+t.toGMTString()+";path="+dir : 
							c_key+"="+value+";expires="+t.toGMTString()+"path=/";
	}
	//删除单个cookie
	,delCookie:function(c_key,dir){
		dir= dir? dir : "/" ;
		this.setCookie(c_key,"",0,dir);
		this.setCookie(c_key,"",-2,dir);
		return this.getCookie(c_key)? "删除cookie失败！"+this.getCookie(c_key) : "删除cookie成功";
	}
	//获取单个cookie
	,getCookie:function(c_key){
		var arr=document.cookie.split("; ");
		//console.log(arr)
		var c_str="";
		foreach(arr,function(arr,key,value){
			var a=value.split("=");
			//console.log(a[0],a[1])
			if (a[0]===c_key) {
				c_str=a[1];
			}
		});
		console.log(c_str)
		return c_str;
	}
	//批量设置cookie
	,setCookies:function(arr_json){	
		//参数如：[{key:"xxx",value:"xxx",time:x},{}]
		var _this=this;
		if (is_array(arr_json)) {
			foreach(arr_json,function(arr,key,value){
				if (is_object(value)) {
					(!value.time)&&(value.time=7);
					_this.setCookie(value.key,value.value,value.time,value.dir);
				}
			});
		}
	}
	//批量删除cookie
	,delCookies:function(arr_json,all){
		//参数如：arr_json=>[{key:"xxx",value:"xxx",time:x},{}]
		(!all)&&(all=true);//默认删除全部cookie
		if (all) {
			var arr=document.cookie.split("; ");
			for(var i=0,len=arr.length;i<len;i++){
				var k=arr[i].split("=");
				this.delCookie(k[0]);
			}
		}
		else{
			var _this=this;
			foreach(arr_json,function(arr,i,value){
				foreach(function(json,k,v){
					_this.delCookie(k);
				});
			});
		}
	}
	//批量获取cookie
	,getCookies:function(){
		var arr=document.cookie.split("; ");
		this.getCookieArr=function(){
			return arr;
		}
		var arr_json={};
		foreach(arr,function(arr,key,value){
			var json=value.split("=");
			foreach(json,function(obj,k,v){
				arr_json[json[0]]=v;
			});
		});
		return arr_json;
	}
};
var plug_order=function(){
	if (arguments.length>0) {
		for(var i=0,len=arguments.length;i<len;i++){
			if (typeof arguments[i]==="function") {
				arguments[i].call(this);
			}
			if (typeof arguments[i]==="object" && !("length" in arguments[i])) {
				for(var att in arguments[i]){
					this[att]=arguments[i][att];
				}
			}
		}
	}	
}
plug_order.prototype={
	random_st:function(str,l){
		(!str)&&(str="0123456789");
		(!l)&&(l=5);
		var len=str.length;
		var st="";
		for(var i=0;i<l;i++){
			st+=str[~~(Math.random()*len)];
		}
		return st;
	}
	,random_str:function(mode,l){
		(!l)&&(l=5);
		var n="0123456789";
		var s="abcdefghijklmnopqrstuvwxyz";
		var S="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var ns=n+s;
		var nS=n+S;
		var sS=s+S;
		var nsS=n+s+S;
		var all=nsS+"_";
		switch(true){
			case mode==="all":
				return this.random_st(all,l);
			break;
			case mode==="s":
				return this.random_st(s,l);
			break;
			case mode==="S":
				return this.random_st(S,l);
			break;
			case mode==="ns":
				return this.random_st(ns,l);
			break;
			case mode==="nS":
				return this.random_st(nS,l);
			break;
			case mode==="sS":
				return this.random_st(sS,l);
			break;
			case mode==="nsS":
				return this.random_st(nsS,l);
			break;	
			default:
				return this.random_st(n,l);
			break;	
		}
	}
};
var rand_str=new plug_order();