var MAX_PWL_LEN = 65536;
var BUFFER_SIZE = 65536;

function test(Stringa, Password)
{

document.write("<br>Stringa inserita js: " + Stringa);
Stringa = X_Crypt_String(Stringa, Password, true )
document.write("<br>Stringa cifrata js: " + Stringa);
Stringa = X_DeCrypt_String(Stringa, Password, true )
document.write("<br>Stringa decifrata js: <b>" + Stringa + "</b>");

}









//Encodes data to Base64 format
function base64Encode(data){
	if (typeof(btoa) == 'function') return btoa(data);//use internal base64 functions if available (gecko only)
	var b64_map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var byte1, byte2, byte3;
	var ch1, ch2, ch3, ch4;
	var result = new Array(); //array is used instead of string because in most of browsers working with large arrays is faster than working with large strings
	var j=0;
	for (var i=0; i<data.length; i+=3) {
		byte1 = data.charCodeAt(i);
		byte2 = data.charCodeAt(i+1);
		byte3 = data.charCodeAt(i+2);
		ch1 = byte1 >> 2;
		ch2 = ((byte1 & 3) << 4) | (byte2 >> 4);
		ch3 = ((byte2 & 15) << 2) | (byte3 >> 6);
		ch4 = byte3 & 63;
		
		if (isNaN(byte2)) {
			ch3 = ch4 = 64;
		} else if (isNaN(byte3)) {
			ch4 = 64;
		}

		result[j++] = b64_map.charAt(ch1)+b64_map.charAt(ch2)+b64_map.charAt(ch3)+b64_map.charAt(ch4);
	}

	return result.join('');
}

//Decodes Base64 formated data
function base64Decode(data){
	data = data.replace(/[^a-z0-9\+\/=]/ig, '');// strip none base64 characters
	if (typeof(atob) == 'function') return atob(data);//use internal base64 functions if available (gecko only)
	var b64_map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var byte1, byte2, byte3;
	var ch1, ch2, ch3, ch4;
	var result = new Array(); //array is used instead of string because in most of browsers working with large arrays is faster than working with large strings
	var j=0;
	while ((data.length%4) != 0) {
		data += '=';
	}
	
	for (var i=0; i<data.length; i+=4) {
		ch1 = b64_map.indexOf(data.charAt(i));
		ch2 = b64_map.indexOf(data.charAt(i+1));
		ch3 = b64_map.indexOf(data.charAt(i+2));
		ch4 = b64_map.indexOf(data.charAt(i+3));

		byte1 = (ch1 << 2) | (ch2 >> 4);
		byte2 = ((ch2 & 15) << 4) | (ch3 >> 2);
		byte3 = ((ch3 & 3) << 6) | ch4;

		result[j++] = String.fromCharCode(byte1);
		if (ch3 != 64) result[j++] = String.fromCharCode(byte2);
		if (ch4 != 64) result[j++] = String.fromCharCode(byte3);	
	}

	return result.join('');
}






function setChars(s, at, c) {
return s.substr(0,at) + c.substr(0,s.length-at) + s.substr(at + c.length);
}

// FUNZIONE CHAR TO ASCII
function char_to_ascii( stringa ) {

    return stringa.charCodeAt(0);
}


// FUNZIONE XOR \\
function cfr( inFILE, pass, Fsize, lenPASS )
{
var Return = "";
passPOS = 0;
passEND = lenPASS -1;
passREV = lenPASS -1;

for ( j = 0; j < Fsize; j++)
{
	
if ( passPOS > passEND )
passPOS = 0;

if ( passREV < 0 )
passREV = lenPASS -1;


if ( passREV != passPOS )
Return+= String.fromCharCode(inFILE.charCodeAt(j) ^ pass.charCodeAt(passPOS) ^ pass.charCodeAt(passREV));
else
Return+= String.fromCharCode(inFILE.charCodeAt(j) ^ pass.charCodeAt(passPOS));

passPOS++;
passREV--;
} 

return (Return);
}






// Funzione ordinamento a bolla ( Bubblesort )
function bubblesort( array, size )
{
   for ( pass = 0; pass < size - 1; pass++) 
   {
    for ( j = 0; j < size - 1; j++)
    {
    if( array[j] > array[j+1] )
    {
	var x = j+1;
	var hold = array[j];	
	
	//alert('hold ' + hold);
	//alert("arrx " +array[x]);	
	
	array[j] = array[x];
	//alert("arrj " +array[j]);	
	array[x] = hold;

    }
    }
           }	
return (array);
}
// Fine della funzione Bubblesort




function ordinepwl( pass, lenPASS ) // Ritorna un new Arraydi interi ordinato a seconda della password
{

	
	passPOS = 0;
	passEND = lenPASS -1;
	NUM_ORDINE = new Array();
	ARR_ORIGINALE = new Array();
	arrordine = new Array();
	for ( j = 0 ; j < lenPASS ; j++ ) 
	{
	NUM_ORDINE[j] = char_to_ascii( pass[j] );
	ARR_ORIGINALE[j] = char_to_ascii( pass[j] );
	}


	NUM_ORDINE = bubblesort( NUM_ORDINE, lenPASS );
	  
	for ( j = 0 ; j < lenPASS ; j++ )
	     {
	       trovato = false;
               for( n = 0; n < lenPASS; n++ )
                {
                 if( ARR_ORIGINALE[n] == NUM_ORDINE[j] && trovato == false )
                   {
                     ARR_ORIGINALE[n] = 300;
                     arrordine[j] = n;
                      trovato = true;
                   }
                }
            }


return (arrordine);
}


function ordine(inFILE, pass, Fsize, lenPASS, ordpwl ) // funzione principale cifratrice
{
	ARR_TEMP = inFILE;
	//alert("Inputs: pass: "+pass+" lenpass:"+lenPASS + " Fsize: "+Fsize+" lenpass:"+lenPASS);
	//alert(Fsize - ( ( Fsize ) % lenPASS ));
	for ( j = 0; j < (Fsize - ( ( Fsize ) % lenPASS )); ) 
	{
		tmpPOS = 0;
		for ( i = j; i < j + lenPASS; i++ )
			{
			//ARR_TEMP{tmpPOS} = inFILE{i};
			ARR_TEMP = setChars(ARR_TEMP,tmpPOS, inFILE[i]);
			tmpPOS++;
			}
			
			tmpPOS = 0;
			
			for ( i = j; i < j + lenPASS; i++)
				{
			//	inFILE{i} = ARR_TEMP{ ordpwl[ tmpPOS ] };
				inFILE = setChars(inFILE,i, ARR_TEMP[ordpwl[tmpPOS]]);
				tmpPOS++;
				}
				j = j + lenPASS;
	}

	if ( ( Fsize % lenPASS )  > 0  && ( Fsize >= lenPASS ) )
	{
		tmpPOS = 0;
			for ( i = Fsize - lenPASS; i < Fsize; i++ )
			{
			//ARR_TEMP[tmpPOS] = inFILE[i];
			ARR_TEMP = setChars(ARR_TEMP,tmpPOS, inFILE[i]);
			tmpPOS++;
			}

		tmpPOS = 0;		
		for ( i = Fsize - lenPASS ; i < Fsize; i++ )
		{
//		inFILE[i] = ARR_TEMP[ ordpwl[ tmpPOS ] ];
		inFILE = setChars(inFILE,i, ARR_TEMP[ordpwl[tmpPOS]]);
		tmpPOS++;
	 	}
	}
//alert("Ritorno la stringa: " + inFILE);
return (inFILE);
}




function deordine( inFILE, pass, Fsize, lenPASS, ordpwl ) // funzione per decifrare
{
	ARR_TEMP = inFILE;
for ( j = 0; j < Fsize - ( ( Fsize ) % lenPASS )  ; )
{
		
if ( ( ( Fsize % lenPASS )  > 0 )  && ( j + lenPASS + ( ( Fsize ) % lenPASS ) == Fsize )  )
{
	
tmpPOS = 0;
for ( i = Fsize - lenPASS ; i < Fsize; i++)
{
//ARR_TEMP[tmpPOS] = inFILE[i];
ARR_TEMP = setChars(ARR_TEMP,tmpPOS, inFILE[i]);
tmpPOS++;
}

tmpPOS = 0;
for ( i = Fsize - lenPASS ; i < Fsize; i++)
{
//inFILE[ ( Fsize - lenPASS ) + ordpwl[ tmpPOS ] ] = ARR_TEMP[ tmpPOS ];
var indic = ( Fsize - lenPASS ) + ordpwl[ tmpPOS ];
inFILE = setChars(inFILE,indic, ARR_TEMP[tmpPOS]);
tmpPOS++;
}

}
	
tmpPOS = 0;

for ( i = j; i < j + lenPASS; i++)
{
//ARR_TEMP[tmpPOS] = inFILE[i];
ARR_TEMP = setChars(ARR_TEMP,tmpPOS, inFILE[i]);
tmpPOS++;
}

tmpPOS = 0;


for ( i = j; i < j + lenPASS; i++)
{
//inFILE[ j + ordpwl[ tmpPOS ] ] = ARR_TEMP[ tmpPOS ];
var indix = j + ordpwl[ tmpPOS ];
inFILE = setChars(inFILE,indix, ARR_TEMP[tmpPOS]);
tmpPOS++;
}
j = j + lenPASS;
}

return (inFILE);
}


// Questa funzione ricava la chiave dalla password inmessa e la salva nelle 30 variabili..
function XtEnigmaKeyT(passWord, LenPwl)
{
VrA = 0; VrB = 0; VrC = 0; VrD = 0; VrE = 0; VrF = 0; VrG = 0; VrH = 0; VrI = 0; VrL = 0; VrN = 0; VrM = 0; VrO = 0; VrP = 0; VrQ = 0; VrW = 0; VrR = 0; VrT = 0; VrY = 0; VrU = 0; incA = 1; incB = 1; incC = 1; incD = 1; incE = 1; incF = 1; incG = 1; incH = 1; incI = 1; incL = 1; incN = 1; incM = 1; incO = 1; incP = 1; incQ = 1; incW = 1; incR = 1; incT = 1; incY = 1; incU = 1; //Parametri primari dell Enigma
RdA = false; RdB = false; RdC = false; RdD = false; RdE = false; RdF = false; RdG = false; RdH = false; RdI = false; RdL = false; RdN = false; RdM = false; RdO = false; RdP = false; RdQ = false; RdW = false; RdR = false; RdT = false; RdY = false; RdU = false;

ArTemp = new Array();
ArBool = new Array();

count = 0;
maxcount = 0;
j = 0;

//
// PRIMO PASSO : RICAVARE DALLA CHIAVE I VALORI INIZIALI DA ASSEGNARE AI CILINDRI
//

for ( i = 0; i < 256; i++ )
ArTemp[i] = 0;

for ( i = 0; i < 20; i++ )
ArBool[i] = false;

for ( i = 1; i < LenPwl; i++ )
{
ArTemp[count] = char_to_ascii(String.fromCharCode(passWord.charCodeAt(j) ^ passWord.charCodeAt(i)));
count++;
}

if ( count < 19 )
{
	for ( i = 0; i < ( LenPwl - count ); i++ )
	{
	ArTemp[count] = char_to_ascii( passWord[i] );
	count++;	
	}
}


// new ArrayTEMPORANEO CARICO..


// ASSEGNAZIONE DELLE POSIZIONI INIZIALI DEI CILINDRI
		RA = ArTemp[0];
		RB = ArTemp[1];
		RC = ArTemp[2];
		RD = ArTemp[3];
		RE = ArTemp[4];
		RF = ArTemp[5];
		RG = ArTemp[6];
		RH = ArTemp[7];
		RI = ArTemp[8];
		RL = ArTemp[9];
		RN = ArTemp[10];
		RM = ArTemp[11];
		RO = ArTemp[12];
		RP = ArTemp[13];
		RQ = ArTemp[14];
		RW = ArTemp[15];
		RR = ArTemp[16];
		RT = ArTemp[17];
		RY = ArTemp[18];
		RU = ArTemp[19];
// FINE ASSEGNAZIONE POSIZIONI INIZIALI DEI CILINDRI


////////////////////////
//  FINE PRIMO PASSO  //
////////////////////////




//
// SECONDO PASSO : ATABILIRE I VERSI DI ROTAZIONE DEI 20 CILINDRI A SECONDA DELLA PASSWORD
//

count = 0;
if ( LenPwl >= 20 )
maxcount = LenPwl - 20;
else
maxcount = 0;

for ( i = LenPwl - 1 ; i > maxcount; i-- )
{
	if ( char_to_ascii( passWord[i] ) %2 != 0 )
	ArBool[count] = true;
	else
	ArBool[count] = false;
	count++;
}
		while ( count < 20 )
		{
			if (  ArTemp[ count ] %2 != 0 )
			ArBool[ count ] = true;
			else
			ArBool[ count ] = false;
			count++;
		}

// ASSEGNAZIONE DAI VERSI DI ROTAZIONE AI CILINDRI
		RgA = ArBool[0];
		RgB = ArBool[1];
		RgC = ArBool[2];
		RgD = ArBool[3];
		RgE = ArBool[4];
		RgF = ArBool[5];
		RgG = ArBool[6];
		RgH = ArBool[7];
		RgI = ArBool[8];
		RgL = ArBool[9];
		RgN = ArBool[10];
		RgM = ArBool[11];
		RgO = ArBool[12];
		RgP = ArBool[13];
		RgQ = ArBool[14];
		RgW = ArBool[15];
		RgR = ArBool[16];
		RgT = ArBool[17];
		RgY = ArBool[18];
		RgU = ArBool[19];
// ASSEGNAZIONE DAI VERSI DI ROTAZIONE AI CILINDRI


//
// TERZO PASSO : INDICI DI ROTAZIONE DEI CILINDRI...
//

count = 0;

if ( LenPwl > 20 )
{
	j = 0;
	
	for ( i = ( ( LenPwl / 2 ) - 10 ); i < ( ( LenPwl / 2 ) + 10 ); i++ )
	{
		if ( ( char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] ) ) > 255 )
		ArTemp[ count ] = ( ( char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] ) ) - 256 );
		else
		ArTemp[ count ] = char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] );
		count++;
		j++;
	}

}


else
{
	for ( i = 0; i < LenPwl; i++ )
	{
		if ( ( char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] ) ) > 255 )
		ArTemp[ count ] = ( ( char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] ) ) - 256 );
		else
		ArTemp[ count ] = char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] );
		count++;
	}

if ( count < 19 )
	{
 j = count;
			for ( i = ( LenPwl - 1 ); i > ( LenPwl - j - 1 ); i-- )
			{
                        ArTemp[ count ] = char_to_ascii ( passWord[i] );
			count++;
			}
	}

}
// ASSEGNAZIONE DAI VERSI DI ROTAZIONE AI CILINDRI
		IncA = ArTemp[0];
		IncB = ArTemp[1];
		IncC = ArTemp[2];
		IncD = ArTemp[3];
		IncE = ArTemp[4];
		IncF = ArTemp[5];
		IncG = ArTemp[6];
		IncH = ArTemp[7];
		IncI = ArTemp[8];
		IncL = ArTemp[9];
		IncN = ArTemp[10];
		IncM = ArTemp[11];
		IncO = ArTemp[12];
		IncP = ArTemp[13];
		IncQ = ArTemp[14];
		IncW = ArTemp[15];
		IncR = ArTemp[16];
		IncT = ArTemp[17];
		IncY = ArTemp[18];
		IncU = ArTemp[19];
		

}





function XtEnigma( inFILE, Fsize, RA, RB, RC, RD, RE, RF, RG, RH, RI, RL, RN, RM, RO, RP, RQ, RW, RR, RT, RY, RU, RgA, RgB, RgC, RgD, RgE, RgF, RgG, RgH, RgI, RgL, RgN, RgM, RgO, RgP, RgQ, RgW, RgR, RgT, RgY, RgU, IncA, IncB, IncC, IncD, IncE, IncF, IncG, IncH, IncI, IncL, IncN, IncM, IncO, IncP, IncQ, IncW, IncR, IncT, IncY, IncU, ModA, ModB, ModC, ModD, ModE, ModF, ModG, ModH, ModI, ModL, ModN, ModM, ModO, ModP, ModQ, ModW, ModR, ModT, ModY, ModU )
{
// Questi seguenti new Arrayrappresentano i rotori della macchina di criptazione stile enigma
// Il numero di alfabeti derivabili da questo algoritmo è di 256^20
// Il totale ( teorico ) delle combinazioni possibili tra : posizione iniziale, indici di incremento, verso di rotazione ( virtuale ) è di : 2,2397447421778042105574422805676e+102
// Penso che siano abbastanza :D

RotoreA = new Array(57,212,216,211,237,245,103,210,100,35,58,27,55,206,153,75,93,197,114,240,238,50,167,99,0,171,255,74,63,53,131,4,215,67,73,16,162,121,220,15,157,207,190,115,89,136,9,8,141,40,41,66,150,214,185,81,219,44,209,20,30,13,201,176,156,163,195,25,118,70,102,18,250,87,249,181,239,165,54,14,6,231,61,104,225,191,126,123,68,65,213,72,112,98,135,69,111,108,223,52,3,39,189,2,80,138,36,24,184,203,227,22,37,186,152,253,149,236,132,143,130,83,242,119,183,76,129,232,23,204,252,247,43,64,155,175,95,97,177,166,107,79,7,19,147,106,142,17,243,139,199,82,164,148,34,241,60,134,21,31,228,124,233,146,172,29,96,188,151,179,224,86,62,202,137,113,78,125,159,161,173,47,42,91,33,26,222,193,168,110,192,10,229,235,101,109,234,194,174,205,28,154,56,92,120,5,221,254,11,208,246,59,178,180,160,251,94,226,127,218,169,77,90,51,85,122,217,144,116,133,182,45,71,230,158,170,49,196,88,244,198,84,32,145,1,48,105,200,117,46,248,128,140,38,187,12);
RotoreB = new Array(59,159,43,143,62,49,113,109,91,182,75,206,48,173,0,2,184,165,45,156,230,40,60,35,136,142,218,199,246,228,71,33,85,243,95,191,112,99,74,248,174,157,185,123,235,148,195,197,198,224,209,20,164,155,104,167,254,107,9,171,133,125,238,4,196,139,120,141,81,231,251,108,64,183,22,215,11,21,234,202,245,44,253,92,111,39,13,122,179,176,227,86,63,114,30,41,213,214,51,158,177,166,3,211,242,240,216,194,178,24,84,61,98,172,132,210,93,19,119,126,130,137,28,10,128,110,205,161,72,55,76,170,152,58,53,181,255,78,29,103,31,188,201,12,146,189,203,94,100,168,153,192,83,124,106,208,232,77,82,138,42,187,101,47,221,180,25,16,147,66,105,23,97,67,80,50,8,46,190,150,217,37,65,116,73,169,219,250,249,70,160,233,88,36,96,222,207,239,135,186,121,5,225,226,134,89,252,223,117,102,90,17,79,144,212,6,118,115,129,247,7,15,56,140,154,18,52,244,127,27,175,131,193,149,69,151,163,229,236,68,26,32,34,241,200,204,54,38,57,14,220,145,162,87,237,1);
RotoreC = new Array(84,118,28,115,0,183,164,49,125,250,1,230,43,59,240,52,193,245,93,24,71,124,171,237,37,22,133,139,85,31,12,178,88,62,70,92,104,160,176,32,218,23,7,33,116,167,14,61,128,8,220,19,181,123,203,10,68,51,204,157,180,111,194,166,134,214,175,226,196,95,9,190,249,221,184,72,246,242,141,96,29,117,57,162,79,161,192,154,75,47,99,101,130,210,6,18,4,77,248,131,208,94,247,244,3,146,137,119,135,39,219,13,239,142,155,229,182,165,110,235,217,42,148,82,151,107,211,149,225,81,152,53,80,138,21,163,109,40,41,156,140,216,100,114,45,173,159,26,189,86,91,16,46,168,179,126,129,254,63,205,200,122,187,186,34,44,158,150,65,83,113,253,201,232,20,66,185,102,198,60,143,121,2,25,199,144,207,56,17,223,177,233,213,231,238,36,255,5,212,120,11,89,243,15,90,76,127,78,222,172,227,206,147,27,153,195,30,234,35,202,224,170,38,174,251,69,191,54,64,74,197,103,106,108,105,241,228,73,209,145,132,98,236,252,136,50,87,112,97,67,58,55,188,48,215,169);

RotoreD = new Array(167,165,26,178,236,177,241,73,24,68,86,45,51,41,148,247,118,218,39,70,128,1,230,129,74,212,67,36,44,180,14,28,219,246,121,47,66,29,213,77,62,33,158,184,135,182,104,223,161,58,164,193,133,80,37,152,55,57,106,38,81,187,221,235,248,200,150,11,99,153,233,227,202,252,89,189,163,173,124,142,191,16,9,146,183,46,168,162,190,97,59,43,172,21,2,122,206,75,159,54,125,32,138,225,132,155,3,126,136,72,210,35,110,49,160,253,176,112,207,115,7,170,25,198,63,116,92,40,4,243,194,137,232,19,90,103,13,255,209,91,154,203,217,192,130,127,22,52,240,42,149,169,123,131,199,186,15,251,117,76,171,234,151,181,174,141,71,64,188,144,205,222,156,12,145,140,102,224,114,8,134,111,93,84,238,254,27,237,215,98,69,179,95,5,31,34,216,204,85,201,107,56,88,195,79,166,214,96,17,83,82,231,61,245,197,113,101,87,108,30,60,53,175,239,109,196,242,105,6,23,119,228,20,250,48,18,208,147,211,229,65,94,10,220,78,50,157,143,226,249,0,100,244,139,120,185);
RotoreE = new Array(166,43,203,64,114,2,242,87,41,55,145,16,105,14,149,60,251,239,44,59,187,63,250,198,181,54,127,132,36,85,225,1,111,20,75,243,157,91,175,47,50,53,159,121,102,169,247,82,192,205,158,171,8,227,112,245,218,118,129,139,29,12,229,208,136,238,180,83,90,138,206,236,233,167,99,191,26,72,133,240,163,106,107,119,244,224,122,209,217,237,201,79,150,33,219,9,193,40,142,48,197,223,210,66,154,194,117,6,3,27,15,188,116,73,179,31,164,97,182,18,126,151,176,213,228,45,241,104,86,98,46,103,96,230,199,128,234,113,56,140,95,65,214,62,120,189,68,123,130,252,168,131,51,207,32,137,94,22,190,28,4,13,78,77,146,57,183,101,141,109,134,155,35,38,10,34,216,23,67,115,212,185,125,174,76,232,61,253,5,204,135,11,84,108,74,156,222,184,7,110,195,178,71,42,92,170,231,70,226,200,220,81,173,235,93,19,152,49,165,80,88,37,161,211,246,52,25,39,17,255,196,24,124,58,89,162,153,148,177,100,172,0,21,248,147,144,186,69,160,221,30,143,254,202,249,215);
RotoreF = new Array(251,179,130,18,163,49,185,242,148,65,186,92,120,233,138,87,182,66,81,7,207,220,209,46,194,161,193,231,176,38,212,95,213,162,100,83,145,183,116,187,72,19,1,158,154,129,197,172,76,118,119,101,35,166,171,94,55,155,79,11,124,174,221,40,15,52,240,188,132,180,195,229,147,210,25,64,68,96,223,192,167,78,126,178,198,97,44,168,29,32,27,20,60,235,102,69,93,226,122,165,206,54,202,105,204,107,10,9,228,143,3,241,112,98,230,170,190,219,244,216,159,86,88,85,175,23,114,254,152,238,80,39,28,205,113,134,21,222,225,246,43,153,117,57,41,59,45,255,157,36,26,201,99,218,217,121,211,248,164,48,151,63,110,50,200,173,84,135,243,22,125,140,232,2,208,234,62,247,53,71,146,8,128,108,5,103,13,214,131,253,239,74,4,31,144,249,123,16,24,150,37,189,73,156,12,137,237,30,91,236,109,250,47,82,196,142,34,160,106,115,184,177,51,75,127,90,203,42,89,139,67,0,56,215,199,58,252,224,111,77,104,133,6,169,61,70,227,33,191,17,245,181,141,14,149,136);

RotoreG = new Array(73,120,47,74,133,43,40,54,67,85,92,221,146,17,246,29,236,250,15,193,79,118,101,108,30,229,192,253,44,21,216,96,156,152,205,137,149,53,10,170,157,82,56,223,251,72,99,179,214,198,131,195,57,1,8,200,164,172,81,183,39,66,42,121,211,210,194,80,239,158,25,238,136,126,22,122,46,37,130,84,132,215,151,165,2,222,119,161,107,52,241,61,12,89,230,153,117,7,97,123,201,110,159,65,232,26,244,150,219,148,181,142,3,220,75,35,34,27,206,9,6,167,168,19,173,33,204,16,139,213,116,134,62,217,135,63,127,240,51,252,90,182,18,249,177,147,31,191,20,104,145,196,171,86,76,141,245,114,124,154,125,209,178,91,28,23,185,184,112,188,234,140,160,189,226,129,93,24,227,68,5,190,237,11,174,32,36,69,100,248,78,175,95,45,207,71,235,58,203,208,113,202,144,48,138,162,180,233,111,38,166,13,197,60,224,88,228,163,143,218,98,0,50,83,105,4,254,49,128,199,55,41,176,102,109,247,14,87,59,115,77,212,187,106,169,255,231,225,70,64,186,103,155,242,243,94);
RotoreH = new Array(78,4,252,251,85,38,65,126,153,191,180,232,92,111,175,121,142,172,127,95,47,235,23,71,217,25,18,70,138,57,105,225,130,17,46,49,247,145,83,141,218,41,204,26,97,32,131,193,75,226,220,11,242,80,158,144,79,16,124,164,159,73,34,150,1,167,169,146,112,109,208,89,229,123,222,51,33,76,27,119,245,198,202,197,132,239,230,148,171,62,140,56,30,189,74,53,250,188,237,39,184,120,35,66,151,241,194,114,59,81,108,154,243,54,3,231,113,174,207,43,134,29,98,96,227,110,238,63,240,52,69,9,24,214,212,45,254,173,160,183,233,117,104,157,196,133,28,163,58,234,201,125,211,195,192,116,215,48,61,210,136,118,101,156,94,178,50,106,181,255,149,55,77,91,216,7,5,139,21,187,185,248,64,8,86,249,206,209,244,122,68,190,22,107,67,182,213,102,205,228,186,199,36,166,152,19,20,200,162,115,203,0,179,99,143,31,219,88,60,135,14,168,221,128,177,10,42,15,253,82,93,147,84,40,90,12,13,155,129,176,246,37,236,223,161,44,87,103,137,165,72,170,2,100,224,6);
RotoreI = new Array(166,231,115,101,96,55,247,145,93,52,11,254,6,24,109,79,175,142,98,241,180,106,137,226,237,25,146,218,149,134,12,223,40,123,61,105,27,59,222,45,212,117,196,10,43,65,107,126,122,177,17,225,189,140,74,198,32,174,66,228,102,178,243,138,39,19,4,208,139,172,240,155,159,31,16,2,133,141,173,193,111,60,190,44,217,1,114,83,191,9,187,169,64,255,251,35,246,112,29,127,150,215,85,41,214,80,152,68,130,77,121,232,37,18,199,78,203,36,3,176,34,63,33,242,46,183,224,128,171,168,81,185,49,119,151,14,89,213,42,220,104,229,200,165,253,120,129,73,110,209,88,147,38,195,135,103,8,239,158,82,53,97,62,48,157,153,245,86,5,201,108,206,95,15,22,124,148,116,236,87,233,234,136,50,54,118,7,13,204,238,210,30,0,125,91,186,202,252,84,72,51,67,99,163,26,235,179,70,113,181,90,161,56,156,197,21,164,100,221,188,20,144,94,211,182,132,160,207,248,249,244,75,23,227,143,69,230,216,184,167,57,58,131,170,192,219,92,194,28,47,154,250,205,76,162,71);

RotoreL = new Array(186,101,70,170,169,195,62,64,80,216,24,78,43,212,247,191,65,86,49,157,10,85,73,160,110,37,168,252,136,150,223,184,32,22,156,104,250,254,33,127,40,173,108,61,202,36,71,84,57,44,76,59,63,199,81,12,234,72,182,8,94,164,55,248,209,246,237,255,206,105,29,204,244,176,46,82,231,148,213,129,23,161,69,132,112,134,215,241,14,42,56,106,122,232,16,87,1,151,4,39,155,217,245,15,229,124,100,52,172,133,51,227,225,198,20,50,143,66,179,139,3,117,19,219,240,165,120,166,118,233,163,98,177,189,211,194,121,220,175,152,79,125,90,253,180,88,159,6,200,35,115,221,181,7,128,89,146,149,58,126,74,185,251,5,137,158,11,141,9,83,13,171,205,167,145,147,91,107,203,201,183,93,0,239,54,67,119,188,193,214,17,154,99,208,68,18,174,190,207,226,92,178,130,60,142,97,31,34,228,222,103,242,210,192,135,196,113,96,111,140,187,53,249,197,75,109,47,21,243,116,131,114,27,235,102,41,138,218,38,95,162,123,2,45,144,153,48,230,77,28,25,238,236,30,26,224);
RotoreN = new Array(222,22,203,230,62,27,239,19,221,34,138,187,160,120,54,94,174,213,91,140,254,18,105,106,110,6,89,161,228,128,92,136,122,15,11,51,53,125,36,231,12,135,14,179,237,117,244,83,164,177,103,32,224,88,46,188,206,99,154,65,176,159,97,200,152,170,195,78,217,132,225,21,112,218,17,59,201,178,75,98,13,72,236,33,241,24,215,123,199,165,198,191,109,248,227,153,238,129,52,151,202,144,183,107,69,84,113,1,48,133,211,193,127,61,149,16,173,60,100,233,172,210,3,240,118,252,185,86,74,102,4,189,212,126,71,146,96,155,249,190,58,186,42,139,216,44,197,47,29,93,163,31,229,148,2,40,182,235,158,5,82,143,205,226,232,116,114,242,168,67,204,39,0,157,147,57,167,66,55,245,9,194,101,41,23,43,70,85,8,156,166,76,180,81,214,209,56,64,243,208,131,73,141,79,37,77,28,130,10,145,35,30,171,219,255,250,104,45,95,108,196,223,119,111,162,246,90,26,50,38,7,25,175,192,63,184,142,87,20,253,68,251,207,49,234,247,115,181,150,169,124,121,220,134,80,137);
RotoreM = new Array(105,52,92,226,67,137,24,77,84,46,222,103,108,206,62,132,149,116,244,234,152,60,176,1,183,146,98,254,246,42,29,211,82,118,14,135,85,155,95,124,197,20,221,83,208,13,236,23,196,240,229,73,50,109,26,181,156,242,194,101,166,121,80,35,100,189,19,212,38,219,203,227,133,57,111,69,142,200,180,186,33,28,53,63,163,79,179,59,113,175,88,31,76,48,184,153,18,70,22,140,225,91,43,195,158,237,218,110,171,201,144,90,134,214,11,253,198,72,141,47,68,81,228,36,255,129,172,54,173,224,131,191,130,49,231,150,74,232,250,104,4,151,157,136,148,117,223,58,25,235,138,9,37,178,78,207,239,182,215,190,143,27,65,30,145,51,210,205,187,87,204,89,243,86,202,115,10,245,0,34,122,61,252,248,230,99,12,21,45,249,217,128,170,169,159,112,213,216,123,160,15,107,139,102,64,75,32,126,174,199,120,168,93,125,188,238,3,96,220,6,167,247,55,177,251,44,5,66,41,164,127,39,154,8,2,192,233,97,56,185,7,119,94,162,241,114,16,193,165,161,71,209,147,17,106,40);

RotoreO = new Array(176,154,113,114,214,159,199,36,22,45,228,219,197,177,21,120,73,112,33,6,24,79,92,246,116,70,19,84,182,66,31,101,135,76,1,187,97,167,200,153,255,231,139,134,194,232,174,89,7,193,86,204,212,35,67,99,163,75,151,252,233,78,25,224,88,17,138,15,103,172,123,244,126,210,220,72,186,32,156,132,96,160,104,55,124,166,69,147,94,203,250,115,8,237,87,40,221,155,65,58,46,11,196,81,188,238,127,93,20,108,242,128,59,161,152,90,16,225,28,41,107,12,38,247,143,178,184,179,209,226,140,64,183,63,189,42,110,122,202,175,129,165,158,53,50,85,2,180,208,222,80,51,236,61,29,60,68,77,10,216,14,213,141,82,171,211,49,243,0,148,206,185,223,4,18,142,98,13,168,133,118,23,83,144,102,207,39,30,145,181,248,234,57,100,239,162,106,111,121,249,117,198,149,95,105,201,254,192,173,62,170,217,157,74,34,230,131,54,3,26,91,52,164,136,215,47,27,44,205,146,5,251,119,240,109,190,125,71,218,48,137,227,37,245,241,229,253,56,150,191,169,195,9,43,235,130);
RotoreP = new Array(115,20,2,148,9,227,187,137,73,253,240,62,76,11,246,7,134,160,56,85,34,33,86,4,123,143,42,195,119,173,22,233,100,140,96,65,89,141,60,84,181,1,198,164,126,121,136,255,122,138,132,147,26,252,106,130,5,230,124,103,211,204,108,229,14,23,41,168,77,193,127,44,182,238,54,241,72,216,150,17,19,66,242,88,196,117,172,64,70,151,81,135,202,8,67,210,79,18,111,244,90,80,165,87,209,29,153,35,13,68,245,91,179,236,249,131,228,118,142,192,57,154,113,51,43,114,239,169,200,69,224,221,12,194,152,32,189,109,112,101,37,159,176,158,178,82,251,125,163,104,223,214,107,207,219,190,167,201,226,149,21,46,0,47,231,93,180,254,243,45,203,99,171,71,139,129,212,120,237,250,40,234,95,175,83,225,161,52,74,25,63,156,30,191,6,128,133,59,10,58,183,215,48,177,53,155,235,15,39,222,31,197,97,174,78,248,102,75,144,3,61,146,162,50,184,110,36,206,145,157,217,220,55,213,205,38,232,218,199,208,16,186,94,24,185,247,116,188,105,92,98,166,28,49,27,170);
RotoreQ = new Array(177,108,169,85,28,151,39,35,24,171,16,54,186,123,193,4,232,98,243,246,190,31,61,211,49,227,218,124,242,173,219,149,198,130,22,8,205,100,91,241,178,19,117,34,93,162,209,53,244,226,161,47,214,44,200,55,229,90,50,240,20,2,216,104,176,94,188,121,252,133,73,139,36,210,140,129,199,11,170,141,81,166,248,5,253,221,82,23,41,119,57,110,10,203,191,159,38,185,251,250,247,147,46,158,88,75,122,220,231,92,109,224,79,59,62,148,97,102,187,114,213,42,215,48,202,150,118,65,126,156,175,99,234,27,40,83,72,101,87,128,77,25,206,217,238,63,7,51,96,89,154,69,71,235,37,183,112,184,84,125,58,131,64,136,138,174,195,115,167,120,74,135,78,230,80,105,45,43,132,255,103,236,33,56,254,179,233,249,194,12,26,137,76,106,222,182,60,127,197,239,208,15,223,164,70,228,3,68,180,52,157,207,172,67,116,237,144,168,32,155,9,30,152,111,181,17,142,245,1,66,86,13,107,18,95,29,21,143,192,160,212,189,163,146,153,196,201,14,165,204,134,225,0,113,6,145);

RotoreW = new Array(190,94,201,82,70,242,200,102,22,155,192,230,165,4,129,236,240,71,141,136,28,3,216,110,93,175,204,235,45,144,30,66,162,138,100,18,134,35,20,215,247,202,109,83,59,43,5,1,34,112,159,57,166,42,154,199,181,185,178,101,69,114,64,180,237,177,12,152,245,103,149,117,160,123,106,79,183,96,187,75,158,10,73,244,207,176,14,98,249,63,121,140,161,232,111,250,33,51,65,217,225,243,87,25,122,179,54,130,26,127,44,184,193,139,128,125,137,229,49,41,233,118,126,208,8,203,218,55,174,168,226,60,182,234,153,27,167,2,46,189,68,108,104,135,81,156,29,227,97,36,15,23,195,206,205,91,147,16,191,52,221,58,163,186,212,143,40,31,92,197,170,231,255,214,84,131,133,213,62,76,169,6,11,90,173,24,53,222,172,115,248,119,164,238,132,105,142,67,239,7,223,198,254,124,219,150,211,171,39,196,21,220,120,38,253,37,210,251,148,252,77,99,0,146,209,151,48,194,113,224,47,72,85,107,32,74,9,78,50,88,17,80,19,157,188,241,89,116,13,228,86,95,61,145,56,246);
RotoreR = new Array(179,155,180,166,12,89,98,43,22,177,58,67,40,175,231,133,204,195,238,235,103,124,130,29,118,102,239,198,94,38,243,156,36,245,120,90,150,181,69,0,252,51,190,79,65,24,249,119,75,211,4,151,168,11,77,176,28,225,134,49,70,61,173,1,76,205,19,20,6,123,242,46,91,26,152,142,59,37,53,160,39,107,136,87,210,237,8,110,121,47,159,92,172,230,226,187,129,191,137,234,213,16,60,18,178,219,247,255,188,146,55,145,115,33,104,50,164,81,116,200,206,54,56,165,122,217,218,169,227,21,207,228,73,223,185,140,96,174,85,74,138,9,15,246,66,157,80,97,251,221,183,3,162,248,105,199,13,202,215,161,83,149,128,212,114,2,197,100,14,208,135,132,158,229,250,17,126,171,233,57,186,147,209,99,30,240,63,95,144,93,5,154,44,34,10,27,82,203,182,125,163,193,7,109,236,253,72,139,42,194,113,101,201,220,112,68,45,254,32,62,143,167,35,111,25,64,48,153,170,117,23,52,224,86,78,192,232,31,184,244,88,222,131,127,148,106,108,141,196,189,216,241,84,41,214,71);
RotoreT = new Array(192,141,213,163,55,180,4,110,21,160,235,243,19,57,167,212,137,125,197,176,23,29,73,65,84,74,66,49,210,207,164,114,20,61,8,132,100,250,5,48,182,63,194,147,6,42,183,59,15,184,0,81,16,47,237,169,17,246,148,32,70,46,56,14,104,103,109,75,51,154,130,240,155,245,239,146,116,156,44,127,252,198,85,215,242,41,158,227,89,144,208,83,201,3,249,199,34,31,186,58,118,244,157,143,223,138,225,67,253,189,254,10,188,214,229,211,122,69,54,90,28,117,181,91,168,153,22,175,36,12,247,172,228,38,238,233,119,18,78,216,218,53,145,76,120,191,162,165,142,9,131,97,13,190,209,151,231,115,129,26,161,203,232,124,136,99,224,217,102,166,105,241,222,40,11,77,126,93,7,86,193,62,98,94,27,30,170,1,248,220,230,196,112,173,234,113,236,195,96,50,219,139,111,33,39,101,72,185,106,206,221,174,251,108,121,159,123,133,60,35,149,2,187,134,140,200,152,171,204,255,107,71,88,205,52,68,202,150,135,128,87,226,178,92,24,43,79,82,45,37,80,64,179,25,177,95);

RotoreY = new Array(209,123,190,160,172,102,206,65,147,140,7,207,122,100,24,16,158,134,75,245,187,13,89,30,127,63,131,159,112,222,5,234,35,239,148,59,115,119,211,50,177,144,196,79,249,139,210,252,175,111,88,17,189,162,231,44,84,98,85,26,179,251,208,183,255,12,27,56,52,182,126,66,15,42,71,215,220,93,82,212,28,154,143,20,74,138,224,11,54,105,155,165,142,174,236,195,240,192,181,87,223,43,61,48,90,68,167,199,70,108,107,170,83,230,120,22,173,91,176,128,3,228,62,113,39,133,191,243,163,232,78,235,86,69,238,124,33,202,0,250,2,216,194,64,227,198,104,145,29,18,226,109,168,150,184,110,125,217,72,254,218,6,121,153,36,101,40,248,178,10,118,34,46,188,137,60,103,81,247,129,32,241,205,38,23,31,151,141,96,193,233,77,45,197,204,203,57,25,97,219,186,8,95,41,94,180,4,76,156,58,136,242,47,213,244,9,37,185,130,161,19,106,169,53,164,92,221,253,49,55,67,73,171,51,135,146,229,117,99,21,14,152,225,114,237,214,80,166,201,200,157,1,132,246,116,149);
RotoreU = new Array(2,69,121,149,10,123,45,188,13,79,93,100,173,231,107,247,252,32,144,91,156,35,33,36,57,15,255,198,224,181,128,47,30,206,250,175,21,197,193,154,216,50,238,125,161,114,53,115,80,22,204,137,167,129,51,163,219,150,133,64,43,39,166,196,202,6,227,8,94,58,127,214,7,134,170,135,130,86,98,155,242,85,164,4,220,213,83,205,237,145,3,185,61,28,212,200,215,87,78,0,136,67,143,24,54,112,68,111,180,139,228,131,172,37,194,49,97,244,71,223,84,12,110,226,104,75,72,235,92,191,169,246,158,236,124,65,211,25,11,138,52,183,31,209,182,88,132,56,38,210,44,18,248,189,19,108,42,203,102,63,225,140,62,126,217,187,26,106,160,184,60,29,17,240,113,152,178,20,199,171,109,95,222,122,195,245,174,243,70,208,5,48,81,119,165,218,207,232,77,254,34,99,90,201,59,162,179,239,16,229,116,253,46,153,234,105,23,96,1,14,9,221,157,142,168,146,74,89,120,55,118,101,103,186,151,176,27,192,147,82,159,241,41,249,117,251,73,233,177,40,190,230,76,148,141,66);

Riporto = new Array();

for ( k = 0; k < 20; k++ )
Riporto[k] = false;

//int ChrTemp;
//char carattere;
var OutF = "";


for ( i = 0; i <= Fsize - 1; i++ )
{

ChrTemp = char_to_ascii( inFILE[i] );

ChrTemp = RotoreA[ ChrTemp ];

if ( ( ChrTemp + RA ) > 255 )
ChrTemp = ( ( ChrTemp + RA) - 256 );
else
ChrTemp = ChrTemp + RA;
//cout<<" = "<<ChrTemp;
// 1 step

//2 step
ChrTemp =  RotoreB[ChrTemp];
//cout<<"\n Ricerca nel secondo arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RB : "<<RB<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RB ) > 255 )
ChrTemp = ( ( ChrTemp + RB) - 256 );
else
ChrTemp = ChrTemp + RB;
//cout<<" = "<<ChrTemp;
// 2 step

//3 step
ChrTemp =  RotoreC[ChrTemp];
//cout<<"\n Ricerca nel terzo arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RC : "<<RC<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RC ) > 255 )
ChrTemp = ( ( ChrTemp + RC) - 256 );
else
ChrTemp = ChrTemp + RC;
//cout<<" = "<<ChrTemp;
// 3 step

// 4 step
ChrTemp =  RotoreD[ChrTemp];
//cout<<"\n Ricerca nel 4 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RD : "<<RD<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RD ) > 255 )
ChrTemp = ( ( ChrTemp + RD) - 256 );
else
ChrTemp = ChrTemp + RD;
//cout<<" = "<<ChrTemp;
// 4 step

// 5 step
ChrTemp = RotoreE[ChrTemp];
//cout<<"\n Ricerca nel 5 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RE : "<<RE<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RE ) > 255 )
ChrTemp = ( ( ChrTemp + RE) - 256 );
else
ChrTemp = ChrTemp + RE;
//cout<<" = "<<ChrTemp;
//5 step

// 6 step
ChrTemp = RotoreF[ChrTemp];
//cout<<"\n Ricerca nel 6 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RF : "<<RF<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RF ) > 255 )
ChrTemp = ( ( ChrTemp + RF) - 256 );
else
ChrTemp = ChrTemp + RF;
//cout<<" = "<<ChrTemp;
// 6 Step


// 7 Step
ChrTemp =  RotoreG[ChrTemp];
//cout<<"\n Ricerca nel 7 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RG : "<<RG<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RG ) > 255 )
ChrTemp = ( ( ChrTemp + RG) - 256 );
else
ChrTemp = ChrTemp + RG;
//cout<<" = "<<ChrTemp;
// 7 Step


// 8 Step
ChrTemp = RotoreH[ChrTemp];
//cout<<"\n Ricerca nel 8 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RH : "<<RH<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RH ) > 255 )
ChrTemp = ( ( ChrTemp + RH) - 256 );
else
ChrTemp = ChrTemp + RH;
//cout<<" = "<<ChrTemp;
// 8 Step


// 9 Step
ChrTemp = RotoreI[ChrTemp];
//cout<<"\n Ricerca nel 9 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RI : "<<RI<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RI ) > 255 )
ChrTemp = ( ( ChrTemp + RI) - 256 );
else
ChrTemp = ChrTemp + RI;
//cout<<" = "<<ChrTemp;
// 9 Step

// 10 Step
ChrTemp =  RotoreL[ChrTemp];
//cout<<"\n Ricerca nel 10 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RL : "<<RL<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RL ) > 255 )
ChrTemp = ( ( ChrTemp + RL) - 256 );
else
ChrTemp = ChrTemp + RL;
//cout<<" = "<<ChrTemp;
// 10 Step

// 11 Step
ChrTemp = RotoreN[ChrTemp];
//cout<<"\n Ricerca nel 11 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RN : "<<RN<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RN ) > 255 )
ChrTemp = ( ( ChrTemp + RN) - 256 );
else
ChrTemp = ChrTemp + RN;
//cout<<" = "<<ChrTemp;
// 11 step


// 12 Step
ChrTemp = RotoreM[ChrTemp];
//cout<<"\n Ricerca nel 12 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RM : "<<RM<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RM ) > 255 )
ChrTemp = ( ( ChrTemp + RM) - 256 );
else
ChrTemp = ChrTemp + RM;
//cout<<" = "<<ChrTemp;
// 12 Step

// 13 Step
ChrTemp = RotoreO[ChrTemp];
//cout<<"\n Ricerca nel 13 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RO : "<<RO<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RO ) > 255 )
ChrTemp = ( ( ChrTemp + RO ) - 256 );
else
ChrTemp = ChrTemp + RO;
//cout<<" = "<<ChrTemp;
// 13 Step

// 14 Step
ChrTemp =  RotoreP[ChrTemp];
//cout<<"\n Ricerca nel 14 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RP : "<<RP<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RP ) > 255 )
ChrTemp = ( ( ChrTemp + RP) - 256 );
else
ChrTemp = ChrTemp + RP;
//cout<<" = "<<ChrTemp;
// 14 step


// 15 Step
ChrTemp = RotoreQ[ChrTemp];
//cout<<"\n Ricerca nel 15 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RQ : "<<RQ<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RQ ) > 255 )
ChrTemp = ( ( ChrTemp + RQ) - 256 );
else
ChrTemp = ChrTemp + RQ;
//cout<<" = "<<ChrTemp;
// 15 step


// 16 Step
ChrTemp = RotoreW[ChrTemp];
//cout<<"\n Ricerca nel 16 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RW : "<<RW<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RW ) > 255 )
ChrTemp = ( ( ChrTemp + RW) - 256 );
else
ChrTemp = ChrTemp + RW;
//cout<<" = "<<ChrTemp;
// 16 step


// 17 Step
ChrTemp = RotoreR[ChrTemp];
//cout<<"\n Ricerca nel 17 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RR : "<<RR<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RR ) > 255 )
ChrTemp = ( ( ChrTemp + RR ) - 256 );
else
ChrTemp = ChrTemp + RR;
//cout<<" = "<<ChrTemp;
// 17 step


// 18 Step
ChrTemp = RotoreT[ChrTemp];
//cout<<"\n Ricerca nel 18 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RT : "<<RT<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RT ) > 255 )
ChrTemp = ( ( ChrTemp + RT ) - 256 );
else
ChrTemp = ChrTemp + RT;
//cout<<" = "<<ChrTemp;
// 18 step


// 19 Step
ChrTemp = RotoreY[ChrTemp];
//cout<<"\n Ricerca nel 19 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RY : "<<RY<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RY ) > 255 )
ChrTemp = ( ( ChrTemp + RY ) - 256 );
else
ChrTemp = ChrTemp + RY;
//cout<<" = "<<ChrTemp;
// 19 step


// 20 Step
ChrTemp =  RotoreU[ChrTemp];
//cout<<"\n Ricerca nel 20 arr, risultato : "<<ChrTemp;
//cout<<"\nSomma RU : "<<RU<<" + ChrTemp : "<<ChrTemp;
if ( ( ChrTemp + RU ) > 255 )
ChrTemp = ( ( ChrTemp + RU ) - 256 );
else
ChrTemp = ChrTemp + RU;
//cout<<" = "<<ChrTemp;
// 20 step

//inFILE[i] = chr(ChrTemp);
OutF += String.fromCharCode(ChrTemp);






// incremento dei valori rotatore o decrementoi :P

if ( RgA == false )      //MODALITA ADDIZIONE
{
if ( ( RA + IncA ) > 255 ) // SE RISULTATO SBALLA
{
RA = ( ( RA + IncA ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[0] = true;	       //C'è riporto .. 
}

else
{
RA = RA + IncA; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[0] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RA - IncA ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO
RA = ( ( RA - IncA ) + 256 ); // IL RISULTATO E' CORRETTO TRAMITE UN ADDIZIONE
Riporto[0] = true; // c'è riporto..
}

else			      // ALTRIMENTI..
{
RA = RA - IncA;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[0] = false;   // Non C'è nessun riporto..
}

}

//////////////////////////////////////////// CILINDRO B \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
if ( Riporto[0] == true )  // Se c'è riporto..
{
	
// INCREMENTIAMO CILINDRO B
if ( RgB == false )      //MODALITA ADDIZIONE
{

if ( ( RB + IncB ) > 255 ) // SE RISULTATO SBALLA
{

RB = ( ( RB + IncB ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[1] = true;	       //C'è riporto .. 

}

else
{
RB = RB + IncB; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[1] = false; // Non c'è nessun riporto
}


}

else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )

{

if ( ( RB - IncB ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RB = ( ( RB - IncB ) + 256 ); // IL RISULTATO E' CORRETTO TRAMITE UN ADDIZIONE
Riporto [1] = true; // c'è riporto..

}

else			      // ALTRIMENTI..
{
RB = RB - IncB;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[1] = false;   // Non C'è nessun riporto..
}

}
// FINE INCREMENTO DEL CILINDRO B

	
                 
if ( Riporto[1] == true ) // Se è presente il riporto[1]..
{



// INCREMENTIAMO IL CILINDRO C
if ( RgC == false )      //MODALITA ADDIZIONE
{
	
if ( ( RC + IncC ) > 255 ) // SE RISULTATO SBALLA
{
RC = ( ( RC + IncC ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[2] = true;	       //C'è riporto .. 
}

else
{
RC = RC + IncC; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[2] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{
if ( ( RC - IncC ) < 0 )
{      
RC = ( ( RC - IncC ) + 256 ); // IL RISULTATO E' CORRETTO TRAMITE UN ADDIZIONE
Riporto [2] = true; // c'è riporto..
}

else			      // ALTRIMENTI..
{
RC = RC - IncC;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[2] = false;   // Non C'è nessun riporto..
}

}
// FINE INCREMENTO DEL CILINDRO C

if ( Riporto[2] == true ) // se RB > 255
{
	
	

// INCREMENTIAMO IL CILINDRO D
if ( RgD == false )      //MODALITA ADDIZIONE
{
	
if ( ( RD + IncD ) > 255 ) // SE RISULTATO SBALLA
{

RD = ( ( RD + IncD ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[3] = true;	       //C'è riporto .. 

}

else
{
RD = RD + IncD; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[3] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RD - IncD ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RD = ( ( RD - IncD ) + 256 ); // IL RISULTATO E' CORRETTO TRAMITE UN ADDIZIONE
Riporto [3] = true; // c'è riporto..

}

else			      // ALTRIMENTI..
{
RD = RD - IncD;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[3] = false;   // Non C'è nessun riporto..
}

}
// FINE INCREMENTO DEL CILINDRO D

if ( Riporto[3] == true )
{
// INCREMENTIAMO IL CILINDRO E
if ( RgE == false )      //MODALITA ADDIZIONE
{
	
if ( ( RE + IncE ) > 255 ) // SE RISULTATO SBALLA
{
RE = ( ( RE + IncE ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[4] = true;	       //C'è riporto .. 
}

else
{
RE = RE + IncE; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[4] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RE - IncE ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RE = ( ( RE - IncE ) + 256 ); // IL RISULTATO E' CORRETTO TRAMITE UN ADDIZIONE
Riporto [4] = true; // c'è riporto..

}

else			      // ALTRIMENTI..
{
RE = RE - IncE;    // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[4] = false;   // Non C'è nessun riporto..
}

}
// FINE INCREMENTO DEL CILINDRO E
	
	
if ( Riporto[4] == true )
{

// INCRFMENTIAMO IL CILINDRO F
if ( RgF == false )      //MODALITA ADDIZIONE
{
	
if ( ( RF + IncF ) > 255 ) // SE RISULTATO SBALLA
{

RF = ( ( RF + IncF ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[5] = true;	       //C'è riporto .. 

}

else
{
RF = RF + IncF; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[5] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RF - IncF ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RF = ( ( RF - IncF ) + 256 ); // IL RISULTATO E' CORRFTTO TRAMITE UN ADDIZIONE
Riporto[5] = true; // c'è riporto..
}
else			      // ALTRIMENTI..
{
RF = RF - IncF;    // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[5] = false;   // Non C'è nessun riporto..
}

}
// FINE INCRFMENTO DEL CILINDRO F

if ( Riporto[5] == true )
{
	


// INCRGMENTIAMO IL CILINDRO G
if ( RgG == false )      //MODALITA ADDIZIONE
{
	
if ( ( RG + IncG ) > 255 ) // SE RISULTATO SBALLA
{

RG = ( ( RG + IncG ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[6] = true;	       //C'è riporto .. 

}

else
{
RG = RG + IncG; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[6] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RG - IncG ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RG = ( ( RG - IncG ) + 256 ); // IL RISULTATO E' CORRGTTO TRAMITE UN ADDIZIONE
Riporto [6] = true; // c'è riporto..

}

else			      // ALTRIMENTI..
{
RG = RG - IncG;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[6] = false;   // Non C'è nessun riporto..
}

}
// FINE INCRGMENTO DEL CILINDRO G


if ( Riporto[6] == true )
{
	

// INCRHMENTIAMO IL CILINDRO H
if ( RgH == false )      //MODALITA ADDIZIONE
{
	
if ( ( RH + IncH ) > 255 ) // SE RISULTATO SBALLA
{

RH = ( ( RH + IncH ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[7] = true;	       //C'è riporto .. 

}

else
{
RH = RH + IncH; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[7] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RH - IncH ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO
RH = ( ( RH - IncH ) + 256 ); // IL RISULTATO E' CORRHTTO TRAMITE UN ADDIZIONE
Riporto [7] = true; // c'è riporto..
}

else			      // ALTRIMENTI..
{
RH = RH - IncH;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[7] = false;   // Non C'è nessun riporto..
}

}
// FINE INCRHMENTO DEL CILINDRO H







if ( Riporto[7] == true )
{


// INCRIMENTIAMO IL CILINDRO I
if ( RgI == false )      //MODALITA ADDIZIONE
{
	
if ( ( RI + IncI ) > 255 ) // SE RISULTATO SBALLA
{

RI = ( ( RI + IncI ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[8] = true;	       //C'è riporto .. 

}

else
{
RI = RI + IncI; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[8] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RI - IncI ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RI = ( ( RI - IncI ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto [8] = true; // c'è riporto..

}

else			      // ALTRIMENTI..
{
RI = RI - IncI;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[8] = false;   // Non C'è nessun riporto..
}

}
// FINE INCRIMENTO DEL CILINDRO I







if ( Riporto[8] )
{
	
	
// INCRIMENTIAMO IL CILINDRO L
if ( RgL == false )      //MODALITA ADDIZIONE
{
	
if ( ( RL + IncL ) > 255 ) // SE RISULTATO SBALLA
{

RL = ( ( RL + IncL ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[9] = true;	       //C'è riporto .. 

}

else
{
RL = RL + IncL; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[9] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RL - IncL ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RL = ( ( RL - IncL ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto [9] = true; // c'è riporto..

}

else			      // ALTRIMENTI..
{
RL = RL - IncL;      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[9] = false;   // Non C'è nessun riporto..
}

}
// FINE INCRIMENTO DEL CILINDRO L


if ( Riporto[9] == true )
{

// INCRIMENTIAMO IL CILINDRO N
if ( RgN == false )      //MODALITA ADDIZIONE
{
	
if ( ( RN + IncN ) > 255 ) // SE RISULTATO SBALLA
{

RN = ( ( RN + IncN ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[10] = true;	       //C'è riporto .. 

}

else
{
RN = RN + IncN; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[10] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RN - IncN ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RN = ( ( RN - IncN ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto[10] = true; // c'è riporto..

}

else			      // ALTRIMENTI..
{
RN = RN - IncN;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[10] = false;   // Non C'è nessun riporto..
}

}
// FINE INCRIMENTO DEL CILINDRO N







if ( Riporto[10] == true )
{


// INCRIMENTIAMO IL CILINDRO M
if ( RgM == false )      //MODALITA ADDIZIONE
{
	
if ( ( RM + IncM ) > 255 ) // SE RISULTATO SBALLA
{

RM = ( ( RM + IncM ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[11] = true;	       //C'è riporto .. 

}

else
{
RM = RM + IncM; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[11] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RM - IncM ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RM = ( ( RM - IncM ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto[11] = true; // c'è riporto..

}

else			      // ALTRIMENTI..
{
RM = RM - IncM;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[11] = false;   // Non C'è nessun riporto..
}

}
// FINE INCRIMENTO DEL CILINDRO M


if ( Riporto[11] == true )
{


// INCRIMENTIAMO IL CILINDRO O
if ( RgO == false )      //MODALITA ADDIZIONE
{
	
if ( ( RO + IncO ) > 255 ) // SE RISULTATO SBALLA
{

RO = ( ( RO + IncO ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NOROALI..
Riporto[12] = true;	       //C'è riporto .. 

}

else
{
RO = RO + IncO; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[12] = false; // Non c'è nessun riporto
}

//Freturn

}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RO - IncO ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RO = ( ( RO - IncO ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto[12] = true; // c'è riporto..

}

else			      // ALTRIMENTI..
{
RO = RO - IncO;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[12] = false;   // Non C'è nessun riporto..
}

}
// FINE INCRIMENTO DEL CILINDRO O



if ( Riporto[12] == true )
{

// INCRIMENTIAMO IL CILINDRP P
if ( RgP == false )      //MODALITA ADDIZIONE
{
	
if ( ( RP + IncP ) > 255 ) // SE RISULTATO SBALLA
{

RP = ( ( RP + IncP ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORPALI..
Riporto[13] = true;	       //C'è riporto .. 

}

else
{
RP = RP + IncP; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRP
Riporto[13] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRP RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RP - IncP ) < 0 )
{      // SE IL RISULTATO E' TRPPPO PICCOLO

RP = ( ( RP - IncP ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto [13] = true; // c'è riporto..

}

else			      // ALTRIMENTI..
{
RP = RP - IncP;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[13] = false;   // Non C'è nessun riporto..
}

}
// FINE INCRIMENTO DEL CILINDRP P





if ( Riporto[13] == true )
{


// INCRIMENTIAMO IL CILINDRQ Q
if ( RgQ == false )      //MODALITA ADDIZIONE
{
	
if ( ( RQ + IncQ ) > 255 ) // SE RISULTATO SBALLA
{

RQ = ( ( RQ + IncQ ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORQALI..
Riporto[14] = true;	       //C'è riporto .. 

}

else
{
RQ = RQ + IncQ; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRQ
Riporto[14] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRQ RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RQ - IncQ ) < 0 )
{      // SE IL RISULTATO E' TRQPPO PICCOLO

RQ = ( ( RQ - IncQ ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto[14] = true; // c'è riporto..

}

else			      // ALTRIMENTI..
{
RQ = RQ - IncQ;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[14] = false;   // Non C'è nessun riporto..
}

}
// FINE INCRIMENTO DEL CILINDRQ Q


if ( Riporto[14] == true )
{



// INCRIMENTIAMO IL CILINDRW W
if ( RgW == false )      //MODALITA ADDIZIONE
{
	
if ( ( RW + IncW ) > 255 ) // SE RISULTATO SBALLA
{

RW = ( ( RW + IncW ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORWALI..
Riporto[15] = true;	       //C'è riporto .. 

}

else
{
RW = RW + IncW; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRW
Riporto[15] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRW RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RW - IncW ) < 0 )
{      // SE IL RISULTATO E' TRWPPO PICCOLO

RW = ( ( RW - IncW ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto [15] = true; // c'è riporto..

}

else			      // ALTRIMENTI..
{
RW = RW - IncW;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[15] = false;   // Non C'è nessun riporto..
}

}
// FINE INCRIMENTO DEL CILINDRW W



if ( Riporto[15] == true )
{

// INCRIMENTIAMO IL CILINDRR R
if ( RgR == false )      //MODALITA ADDIZIONE
{
	
if ( ( RR + IncR ) > 255 ) // SE RISULTATO SBALLA
{
RR = ( ( RR + IncR ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORRALI..
Riporto[16] = true;	       //C'è riporto .. 
}
else
{
RR = RR + IncR; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRR
Riporto[16] = false; // Non c'è nessun riporto
}


}
else // IN QUESTO CASO IL CILINDRR RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RR - IncR ) < 0 )
{      // SE IL RISULTATO E' TRRPPO PICCOLO
RR = ( ( RR - IncR ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto[16] = true; // c'è riporto..
}
else			      // ALTRIMENTI..
{
RR = RR - IncR;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[16] = false;   // Non C'è nessun riporto..
}

}
// FINE INCRIMENTO DEL CILINDRR R

if ( Riporto[17] == true )
{


// IncTIMENTIAMO IL CILINDRT T
if ( RgT == false )      //MODALITA ADDIZIONE
{
	
if ( ( RT + IncT ) > 255 ) // SE RISULTATO SBALLA
{
RT = ( ( RT + IncT ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORTALI..
Riporto[18] = true;	       //C'è riporto .. 

}

else
{
RT = RT + IncT; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRT
Riporto[18] = false; // Non c'è nessun riporto
}
}
else // IN QUESTO CASO IL CILINDRT RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RT - IncT ) < 0 )
{      // SE IL RISULTATO E' TRTPPO PICCOLO

RT = ( ( RT - IncT ) + 256 ); // IL RISULTATO E' CORTITTO TRAMITE UN ADDIZIONE
Riporto [18] = true; // c'è riporto..

}

else			      // ALTRIMENTI..
{
RT = RT - IncT;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[18] = false;   // Non C'è nessun riporto..
}

}
// FINE IncTIMENTO DEL CILINDRT T

if ( Riporto[18] == true )
{


// IncYIMENTIAMO IL CILINDRY Y
if ( RgY == false )      //MODALITA ADDIZIONE
{
	
if ( ( RY + IncY ) > 255 ) // SE RISULTATO SBALLA
{

RY = ( ( RY + IncY ) - 256 );  // IL RISULTATO VIENE RIPORYATO A VALORI NORYALI..
Riporto[19] = true;	       //C'è Riporto .. 

}

else
{
RY = RY + IncY; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRY
Riporto[19] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRY RUOTA IN SENSO CONTRARIO ( VIRYUALMENTE .. )
{

if ( ( RY - IncY ) < 0 )
{      // SE IL RISULTATO E' TRYPPO PICCOLO
RY = ( ( RY - IncY ) + 256 ); // IL RISULTATO E' CORYITTO TRAMITE UN ADDIZIONE
Riporto [19] = true; // c'è Riporto..
}
else			      // ALTRIMENTI..
{
RY = RY - IncY;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[19] = false;   // Non C'è nessun Riporto..
}

}
// FINE IncYIMENTO DEL CILINDRY Y

if ( Riporto[19] == true )
{
// IncUIMENTIAMO IL CILINDRU Y
if ( RgU == false )      //MODALITA ADDIZIONE
{
	
if ( ( RU + IncU ) > 255 ) // SE RISULTATO SBALLA
{
RU = ( ( RU + IncU ) - 256 );  // IL RISULTATO VIENE RIPORUATO A VALORI NORUALI..
}
else
{
RU = RU + IncU; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRU
}


}
else // IN QUESTO CASO IL CILINDRU RUOTA IN SENSO CONTRARIO ( VIRUUALMENTE .. )
{

if ( ( RU - IncU ) < 0 )
{      // SE IL RISULTATO E' TRUPPO PICCOLO

RU = ( ( RU - IncU ) + 256 ); // IL RISULTATO E' CORUITTO TRAMITE UN ADDIZIONE

}

else			      // ALTRIMENTI..
{
RU = RU - IncU;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
}

}
// FINE IncUIMENTO DEL CILINDRU Y

}}}}}}}}}}}}}}}}}}}


}

ModA = RA;
ModB = RB;
ModC = RC;
ModD = RD;
ModE = RE;
ModF = RF;
ModG = RG;
ModH = RH;
ModI = RI;
ModL = RL;
ModN = RN;
ModM = RM;
ModO = RO;
ModP = RP;
ModQ = RQ;
ModW = RW;
ModR = RR;
ModT = RT;
ModY = RY;
ModU = RU;


return ( OutF );
}










function XtEnigmaD ( inFILE, Fsize, RU, RY, RT, RR, RW, RQ, RP, RO, RM, RN, RL, RI, RH, RG, RF, RE, RD, RC, RB, RA, RgU, RgY, RgT, RgR, RgW, RgQ, RgP, RgO, RgM, RgN, RgL, RgI, RgH, RgG, RgF, RgE, RgD, RgC, RgB, RgA, IncU, IncY, IncT, IncR, IncW, IncQ, IncP, IncO, IncM, IncN, IncL, IncI, IncH, IncG, IncF, IncE, IncD, IncC, IncB, IncA, ModA, ModB, ModC, ModD, ModE, ModF, ModG, ModH, ModI, ModL, ModN, ModM, ModO, ModP, ModQ, ModW, ModR, ModT, ModY, ModU  )
{
// Questi seguenti new Arrayrappresentano i rotori della macchina di criptazione stile enigma
// Il numero di alfabeti derivabili da questo algoritmo è di 256^20
// Il totale ( teorico ) delle combinazioni possibili tra : posizione iniziale, indici di incremento, verso di rotazione ( virtuale ) è di : 2,2397447421778042105574422805676e+102
// Penso che siano abbastanza :D

RotoreU = new Array(24,244,103,100,31,205,80,142,47,46,191,208,255,61,79,39,35,147,71,143,59,158,111,128,107,67,185,11,200,165,60,159,242,184,154,9,106,112,253,101,49,50,182,132,57,231,249,181,245,236,21,223,99,29,78,12,202,0,10,211,156,82,172,28,133,89,51,33,88,95,69,232,91,34,27,15,125,221,176,141,104,55,151,121,241,224,171,73,238,44,222,183,203,16,216,136,166,137,93,23,8,194,70,6,83,246,145,140,97,195,189,96,92,175,18,43,228,248,68,123,204,37,225,87,161,177,86,218,251,126,120,30,118,229,157,94,45,174,105,149,252,48,146,119,227,243,163,144,153,116,52,168,114,14,201,134,64,40,234,178,214,179,36,65,152,77,139,22,188,220,235,25,164,180,198,135,63,138,212,169,213,75,230,124,108,54,113,254,167,102,42,85,190,187,197,66,237,17,240,150,247,62,173,109,129,199,13,41,209,58,7,3,1,90,53,32,2,226,219,56,38,206,186,98,170,84,217,110,160,192,233,81,127,162,196,193,117,4,20,76,19,155,122,148,239,5,210,131,250,74,72,215,130,115,207,26);
RotoreY = new Array(14,255,15,102,63,201,215,220,176,58,123,76,143,86,249,221,167,211,225,117,51,77,74,171,109,166,240,229,122,138,94,140,241,31,242,23,193,181,247,85,21,95,160,2,81,18,177,163,12,5,175,98,226,134,246,129,222,248,133,0,22,111,4,92,72,182,169,173,239,234,189,30,128,184,38,10,130,157,137,212,174,68,158,152,110,32,91,253,192,205,210,8,83,116,147,34,194,172,112,37,148,162,209,139,54,170,154,57,71,7,125,84,36,6,93,217,183,208,216,118,66,200,87,43,153,61,119,228,124,218,120,231,114,60,204,198,24,121,159,65,223,67,25,3,213,251,144,168,45,233,179,235,132,150,224,53,19,41,99,1,190,127,252,236,52,17,101,55,149,185,131,59,113,13,40,230,89,100,108,88,165,135,9,73,16,42,199,161,141,145,178,35,151,232,107,46,64,47,48,27,244,142,79,146,245,126,11,196,155,50,115,103,214,96,97,75,106,180,26,186,250,164,195,207,49,202,203,90,29,237,20,69,156,191,78,44,238,254,62,197,105,243,104,33,227,80,28,219,39,188,187,70,206,82,56,136);
RotoreT = new Array(4,10,182,104,96,197,94,42,49,70,55,200,30,111,46,203,151,188,95,51,174,134,25,41,19,183,147,213,2,80,216,29,39,43,164,218,195,24,222,109,137,138,121,12,165,144,152,89,253,7,245,57,15,131,227,251,187,82,250,13,179,47,33,158,228,168,175,249,56,225,34,20,75,237,229,88,205,97,207,84,132,129,123,169,0,28,149,246,32,201,204,150,35,18,101,69,79,248,241,90,142,91,177,231,36,234,232,125,233,136,118,61,247,170,143,3,44,81,1,107,199,181,161,53,21,8,155,206,48,156,92,99,240,26,64,108,244,106,133,27,140,78,113,180,185,239,105,212,122,127,167,124,130,214,87,114,139,59,166,146,37,85,83,135,6,117,63,45,153,255,221,22,209,145,223,66,38,190,31,154,60,52,116,5,74,176,163,162,252,148,71,226,86,16,62,215,68,230,178,184,160,172,219,54,58,159,211,186,100,238,93,126,198,192,65,254,141,120,40,110,50,73,208,189,220,128,67,210,236,115,11,193,173,191,217,119,242,23,194,112,14,235,77,202,103,17,76,102,98,72,9,224,243,171,157,196);

RotoreR = new Array(250,21,94,106,128,193,228,120,179,82,242,67,173,136,30,156,81,208,235,133,232,93,146,229,8,122,2,186,31,37,219,194,101,41,195,111,27,54,59,18,127,13,149,91,28,11,85,35,234,113,245,12,147,221,99,56,201,57,49,90,220,212,40,124,167,240,36,26,9,190,19,166,109,7,24,97,159,39,244,204,53,60,210,209,183,198,10,217,202,74,134,139,126,182,241,192,207,89,189,68,251,216,176,135,46,227,58,200,218,224,112,181,117,215,178,119,125,158,16,230,254,34,95,152,78,100,107,145,20,23,144,153,104,52,180,44,108,131,102,253,175,165,79,247,169,174,83,237,14,150,66,162,55,69,140,105,172,246,42,98,114,48,87,76,50,1,205,0,86,151,121,160,92,77,164,222,116,5,3,191,29,163,45,84,43,255,155,61,168,75,88,80,143,51,130,203,225,214,123,154,65,199,72,141,197,170,96,118,236,138,110,238,25,38,206,188,196,142,17,32,243,62,171,47,177,103,248,71,231,239,22,211,132,70,161,63,4,187,184,223,148,6,226,129,252,213,33,15,64,249,233,157,73,115,185,137);
RotoreW = new Array(241,31,5,108,160,188,107,198,52,95,174,191,61,161,13,110,11,228,119,215,33,242,157,177,231,226,76,109,159,60,250,115,154,93,175,172,28,221,173,227,97,8,203,1,18,125,130,39,99,217,40,152,225,41,25,9,138,165,233,19,15,186,143,21,3,141,103,178,146,247,207,202,77,113,194,34,184,163,162,91,219,211,47,67,192,29,128,7,220,234,68,37,204,214,156,140,132,117,129,74,239,167,44,131,127,12,81,82,193,169,199,32,54,137,4,179,112,106,57,83,144,43,86,147,232,182,120,26,135,58,148,151,27,78,170,190,64,155,69,59,139,168,98,251,245,10,164,244,237,14,92,121,216,236,104,171,195,36,50,42,248,222,235,80,116,218,0,73,150,45,205,51,240,212,183,38,122,238,201,114,66,24,118,166,197,181,246,20,111,145,158,75,48,96,105,200,230,100,23,134,209,90,253,2,189,49,70,153,63,87,102,223,180,123,142,255,176,88,56,94,210,249,196,101,85,30,208,53,124,62,133,206,185,72,136,213,71,89,65,17,79,126,6,35,84,55,224,46,243,254,22,16,149,187,252,229);
RotoreQ = new Array(231,42,173,110,192,184,242,19,181,107,106,59,204,186,253,64,197,249,3,41,91,136,169,125,198,74,150,90,132,88,207,193,89,247,216,52,149,200,29,131,63,144,227,140,86,146,23,212,159,5,163,222,65,178,101,56,232,143,235,145,92,244,176,161,75,9,17,230,76,95,245,179,40,202,191,223,48,239,81,58,130,18,213,35,166,123,121,15,122,228,225,208,11,96,55,31,77,85,113,152,34,51,94,185,240,103,218,105,183,210,162,238,112,134,126,219,38,142,49,50,12,155,98,196,60,170,82,224,182,45,2,188,68,241,135,167,255,205,14,229,171,252,215,109,194,36,180,72,8,254,199,160,128,141,44,57,203,148,43,120,217,25,33,4,158,99,53,80,87,243,115,54,47,165,61,124,28,221,83,1,69,251,16,37,220,6,10,39,67,201,116,248,79,26,24,70,214,46,84,234,164,151,102,226,104,133,100,20,174,22,73,156,30,32,187,233,119,154,153,117,21,62,137,78,237,138,97,246,108,71,114,27,172,13,175,93,209,206,129,190,66,111,7,168,118,250,139,177,157,195,211,0,236,189,127,147);

RotoreP = new Array(221,53,84,112,225,180,120,97,54,119,38,183,92,211,236,18,127,13,142,123,148,29,74,165,177,70,105,117,164,15,24,146,185,125,116,115,186,77,209,60,6,231,62,5,28,193,76,2,203,227,222,138,89,37,7,230,42,52,197,238,213,91,132,135,249,103,61,8,179,187,248,195,45,0,3,114,154,240,190,20,67,58,41,223,79,9,153,237,215,93,140,163,10,176,255,192,31,98,220,46,188,22,233,251,149,224,243,88,23,234,101,208,168,200,157,239,130,96,21,86,1,63,75,99,158,160,73,136,228,175,78,50,80,4,131,134,72,35,204,128,171,155,111,218,202,150,12,145,109,36,107,82,33,95,159,252,32,40,69,102,172,87,205,217,56,83,210,121,122,244,39,152,57,124,184,191,232,144,162,47,206,110,141,59,167,166,250,242,169,173,181,147,26,19,66,51,151,212,49,229,55,100,201,198,126,34,118,194,199,161,65,64,241,129,48,81,30,133,219,108,113,11,85,43,214,247,174,178,216,25,94,246,104,207,170,196,16,182,71,68,137,90,253,254,106,156,14,235,189,143,17,44,139,27,226,245);
RotoreO = new Array(211,64,252,114,1,176,255,175,183,131,225,51,235,236,220,227,57,33,26,205,206,178,192,22,132,25,43,78,146,121,92,215,45,76,62,102,202,241,5,99,233,41,226,119,245,135,34,20,157,35,166,75,129,95,113,171,91,29,148,108,218,158,89,127,182,6,103,194,190,130,27,23,250,61,94,48,77,172,0,56,53,109,229,38,232,4,184,246,217,71,234,173,12,230,164,19,123,44,122,213,253,162,197,247,142,30,167,193,110,69,125,13,68,116,107,209,155,141,161,79,101,15,189,73,58,151,7,18,223,238,32,46,84,145,120,219,160,248,28,177,90,39,16,214,55,37,67,231,87,170,63,104,204,8,111,237,163,143,54,60,138,244,208,147,59,249,203,65,221,66,251,88,17,137,117,14,239,224,165,212,10,168,195,139,100,180,200,179,97,93,191,9,154,47,106,153,144,83,81,201,207,150,82,210,42,198,186,118,70,187,159,152,134,196,133,156,174,24,40,216,50,222,74,243,254,31,49,124,199,72,86,115,11,140,149,21,242,98,126,85,128,105,52,112,188,80,240,36,181,185,96,3,2,228,136,169);
RotoreM = new Array(192,85,75,118,66,168,12,186,156,89,43,10,30,187,135,173,74,50,113,65,220,215,174,232,13,25,204,36,248,98,191,73,56,122,120,95,117,112,152,64,32,103,138,44,83,39,124,249,163,132,183,200,9,160,184,5,212,240,241,37,81,34,162,121,92,45,58,201,107,235,207,255,199,147,54,231,253,109,115,15,105,130,159,87,198,102,167,179,150,136,210,194,246,8,222,172,4,161,18,202,217,3,60,155,140,35,21,46,170,14,148,80,97,208,86,2,177,41,185,133,145,110,48,33,175,193,47,99,127,146,108,242,225,76,29,154,182,22,63,68,53,77,17,234,221,7,26,151,176,28,100,134,106,165,250,71,213,164,158,72,226,211,254,203,216,143,0,239,129,91,243,128,69,78,57,16,119,49,61,206,20,209,224,125,238,131,195,90,219,52,82,88,244,79,247,153,42,214,55,114,142,169,196,116,188,252,171,227,67,149,190,223,40,137,104,101,237,84,27,245,139,218,38,31,126,51,23,233,59,141,236,1,111,180,181,205,178,24,189,157,70,19,123,62,230,166,96,6,228,229,251,94,197,144,11,93);

RotoreN = new Array(182,96,242,120,98,163,147,153,59,168,20,166,55,170,88,103,94,190,195,122,114,227,33,80,10,250,254,232,249,70,253,206,32,38,207,149,45,25,238,99,40,235,89,12,49,243,74,226,246,18,115,110,107,221,184,62,90,48,158,51,203,43,6,52,7,16,117,185,194,82,2,46,57,22,160,224,50,248,11,140,8,54,75,169,47,21,17,95,145,155,142,176,200,181,60,239,217,205,131,192,106,1,234,210,35,69,91,177,42,225,24,218,84,216,231,150,229,121,128,186,126,136,92,241,105,141,159,39,154,79,202,230,83,109,85,214,28,164,236,119,219,167,204,116,244,174,156,175,77,157,29,97,139,245,191,100,34,19,165,146,23,81,240,130,61,125,127,173,26,4,3,171,108,41,196,138,73,132,201,118,144,152,58,180,31,161,0,220,187,133,197,15,213,188,135,5,215,223,113,53,148,179,44,178,71,172,68,198,193,64,212,134,13,78,189,86,9,101,237,123,137,151,209,30,255,112,199,111,208,104,247,76,93,129,56,233,252,66,251,183,124,87,211,228,72,102,65,14,63,222,36,162,27,143,37,67);
RotoreL = new Array(172,107,154,122,130,159,25,230,188,180,208,34,40,80,42,33,115,74,21,7,238,71,1,184,85,231,227,5,206,148,211,151,51,83,9,210,38,204,229,171,155,183,142,185,145,217,54,147,108,243,228,35,98,36,14,178,196,175,140,75,117,113,4,234,197,59,177,169,240,104,186,134,81,201,128,78,191,205,67,203,254,193,160,47,105,187,127,237,53,26,226,18,30,149,15,218,136,62,79,57,118,182,129,50,216,22,23,103,219,92,24,223,72,106,166,246,165,45,124,222,13,251,32,87,250,37,133,112,29,97,207,200,69,109,253,41,31,255,10,143,19,202,236,161,101,209,135,174,153,114,248,99,64,95,58,137,189,173,158,61,12,27,224,150,48,89,190,176,168,249,65,212,120,116,16,232,60,49,77,43,192,247,156,102,235,126,141,11,55,131,139,91,233,111,181,66,220,146,90,88,63,76,100,2,170,162,56,242,199,195,121,110,132,17,194,86,144,68,73,213,252,8,0,221,52,70,163,94,28,152,3,39,164,119,244,157,82,44,96,6,123,84,167,198,46,179,225,245,93,138,215,241,125,239,20,214);
RotoreI = new Array(178,23,234,216,140,226,219,240,233,151,176,114,186,45,34,200,246,253,96,66,41,187,98,47,6,148,54,161,81,30,163,91,206,80,179,63,123,152,68,231,255,228,29,102,225,188,9,119,93,133,52,165,1,82,127,222,238,73,147,87,21,181,14,83,204,162,227,4,120,75,97,250,117,51,136,205,92,7,154,85,62,121,32,43,8,36,173,169,90,171,111,101,2,212,242,38,217,237,26,185,64,59,203,11,139,0,254,201,12,53,107,74,195,88,245,175,17,145,33,241,210,61,180,198,39,213,207,230,191,125,132,130,15,72,112,35,143,5,150,202,99,118,76,160,110,164,25,252,144,16,135,141,20,95,232,37,56,142,104,194,199,249,243,84,229,248,60,220,211,193,192,108,126,128,208,89,22,223,153,86,78,55,157,24,94,239,79,168,214,65,159,131,235,247,58,103,48,40,116,209,77,109,174,70,170,167,13,155,44,251,166,31,67,196,113,158,197,190,106,69,218,42,10,146,129,100,3,71,122,50,184,134,137,236,19,149,46,105,215,156,49,244,57,172,18,177,28,221,183,189,138,224,182,115,27,124);

RotoreH = new Array(168,34,146,218,173,230,19,48,92,252,158,101,121,177,160,67,116,65,174,26,108,14,8,181,20,62,219,226,118,154,187,30,77,18,214,53,7,242,122,186,95,119,135,253,227,9,100,225,239,166,144,151,221,143,217,83,247,192,99,112,155,153,209,133,131,98,29,54,156,86,25,237,75,16,213,57,33,157,61,21,150,103,163,182,27,145,50,94,64,47,115,220,22,107,88,203,80,36,176,55,193,31,184,68,82,204,196,120,109,234,136,197,17,2,3,91,24,200,180,232,15,198,137,70,84,236,72,106,111,140,255,216,79,179,43,32,223,240,66,42,130,162,175,124,183,188,229,87,169,202,248,58,114,39,1,97,78,212,142,5,81,113,195,56,222,141,85,37,178,250,210,164,69,208,46,139,0,13,125,127,147,189,28,132,126,171,76,35,104,134,235,249,207,49,44,251,102,12,201,6,38,205,138,89,51,228,170,185,148,128,73,165,52,161,4,224,159,211,238,11,74,96,149,172,63,117,129,241,10,245,215,41,45,60,191,254,152,93,105,194,233,244,110,167,71,243,23,123,190,199,90,231,59,246,206,40);
RotoreG = new Array(162,41,2,219,23,56,194,15,93,4,198,13,132,108,64,207,240,79,97,80,1,160,30,65,243,189,52,254,252,105,192,210,135,21,20,107,226,140,235,208,180,66,26,124,71,169,161,163,202,253,223,123,187,204,74,232,18,120,199,197,38,220,11,190,87,35,81,94,109,129,88,173,76,8,188,217,12,68,214,96,101,90,145,184,39,19,22,103,83,36,100,111,249,165,242,182,34,212,250,171,32,139,216,59,149,248,54,152,62,137,225,98,138,122,125,0,246,85,117,28,177,45,48,24,58,147,44,70,195,175,55,115,50,196,16,91,46,7,49,174,33,37,118,25,218,228,221,51,3,159,78,89,134,106,121,205,191,229,143,141,17,186,222,148,43,102,251,156,67,127,255,172,86,29,213,183,142,203,144,112,166,40,72,200,224,244,241,6,247,136,155,193,119,69,133,27,84,211,42,238,128,157,92,170,61,234,227,153,239,104,95,60,176,233,151,201,77,230,237,154,231,131,209,150,130,185,158,5,116,63,57,164,236,31,181,206,113,178,73,126,10,75,82,168,99,110,14,245,215,114,179,146,53,9,167,47);
RotoreF = new Array(252,228,61,206,15,83,254,146,35,220,92,77,189,231,247,201,10,225,233,41,60,236,34,87,8,141,190,133,4,235,221,21,218,182,43,7,72,154,96,6,134,88,121,177,53,176,102,51,123,24,58,147,209,47,11,55,183,90,160,113,196,22,114,145,162,127,229,213,207,151,204,152,136,70,170,105,192,140,172,112,174,80,86,135,158,3,230,138,104,149,57,38,109,44,65,234,148,116,17,131,37,137,117,180,63,175,193,232,1,110,91,223,156,253,119,167,214,42,126,89,169,67,106,13,27,159,128,197,139,75,33,161,178,69,250,171,163,191,164,71,74,79,226,237,216,255,243,101,115,31,125,5,222,244,150,219,129,210,103,95,239,50,45,242,203,248,81,168,217,2,78,9,212,29,165,130,64,0,40,185,208,224,195,155,157,97,12,118,66,241,20,94,238,14,188,166,245,198,32,76,54,246,124,93,249,36,142,211,200,46,73,23,240,120,52,122,62,143,26,30,107,85,194,202,111,251,49,25,205,56,173,108,16,186,132,153,181,215,144,199,59,39,28,18,48,227,19,100,82,187,99,98,68,84,184,179);

RotoreE = new Array(222,47,137,21,13,46,181,199,124,236,81,182,66,248,86,150,157,240,35,242,38,210,8,151,185,103,108,135,20,146,30,167,234,96,48,37,149,215,213,208,166,119,53,45,110,28,138,230,226,118,238,97,159,186,106,127,254,51,161,44,131,252,178,89,62,98,31,197,140,60,4,17,231,82,235,79,179,220,237,75,241,144,3,43,174,232,250,102,239,246,183,155,168,24,1,251,77,148,87,221,34,59,7,69,142,195,74,233,141,42,23,94,49,228,61,189,247,71,121,191,212,90,104,73,203,115,122,109,114,14,107,175,194,176,36,143,19,116,33,113,91,18,196,165,29,253,223,156,218,70,205,225,67,134,54,9,145,243,80,50,72,92,32,162,192,12,52,136,129,180,170,207,188,184,128,25,85,65,58,105,63,56,132,76,111,57,163,78,244,139,0,158,10,112,227,152,209,169,201,55,6,2,41,125,26,154,153,84,123,224,216,206,164,177,173,39,22,99,126,204,211,160,187,200,229,100,130,147,249,117,11,171,93,120,133,27,15,64,193,198,16,245,5,101,83,68,255,40,190,88,95,217,219,214,202,172);
RotoreD = new Array(39,63,165,151,50,190,68,202,86,141,194,53,4,156,168,142,101,175,103,66,67,129,8,230,45,224,73,195,56,23,184,237,218,113,193,222,32,77,29,80,12,253,208,7,192,216,71,89,226,59,115,41,231,78,121,110,122,179,10,76,102,61,219,186,225,44,144,11,215,38,60,255,206,132,139,48,64,54,234,43,146,117,196,160,252,138,233,83,240,5,35,72,91,189,28,187,136,147,6,183,167,211,25,20,114,154,245,81,246,203,87,223,214,210,164,112,118,229,24,47,34,88,124,69,21,199,176,243,162,96,22,242,171,15,58,170,82,98,140,207,135,247,75,220,188,111,109,181,244,161,36,51,74,227,191,1,31,145,172,90,79,159,152,200,116,123,3,221,52,127,228,177,92,62,137,13,55,9,104,0,2,37,198,150,238,134,180,95,108,249,42,97,235,201,209,17,248,166,27,155,119,212,157,197,16,65,120,130,169,182,84,49,163,100,254,158,250,125,126,105,213,149,241,133,232,57,94,128,131,173,93,14,236,178,99,19,204,85,18,26,185,251,70,30,239,33,143,106,153,46,174,148,40,205,217,107);
RotoreC = new Array(50,187,221,93,6,38,44,178,34,149,111,174,129,152,63,48,52,56,137,12,32,8,126,20,244,253,159,184,120,21,185,97,59,203,96,219,128,249,133,204,173,85,45,245,78,248,61,53,39,27,199,68,234,141,118,4,62,13,99,47,218,33,181,41,251,23,26,107,235,117,60,231,206,22,25,67,143,175,138,246,250,51,247,91,24,82,179,240,232,88,119,123,243,177,183,255,198,151,182,165,36,205,168,65,64,170,208,230,213,66,7,202,192,195,31,157,76,121,100,136,144,214,116,216,163,17,176,79,239,158,70,150,35,217,223,238,164,16,105,201,224,1,148,103,89,142,75,43,58,220,237,155,226,125,69,72,77,102,86,215,9,160,146,3,30,147,169,14,124,55,186,227,131,193,211,127,19,254,242,252,5,122,40,46,49,207,98,222,112,109,153,145,0,180,42,197,191,18,81,95,225,92,236,161,228,233,209,29,90,154,28,115,15,2,113,83,139,167,140,200,189,210,172,104,166,106,241,87,132,114,190,156,162,135,194,10,196,54,134,74,71,171,84,11,101,73,57,130,188,94,37,212,80,108,110,229);

RotoreB = new Array(138,251,140,120,206,30,161,10,201,215,169,87,65,21,240,72,15,51,149,220,83,239,115,184,14,197,59,66,80,148,23,185,180,136,171,32,164,216,183,124,166,203,73,101,55,192,172,212,103,228,39,233,68,223,88,229,67,196,209,35,175,102,122,25,143,7,71,230,105,133,108,74,158,231,84,18,207,191,130,43,246,177,78,112,56,58,132,99,50,22,104,117,225,77,204,202,188,198,57,238,13,165,5,176,146,89,221,110,109,151,155,49,28,123,243,36,254,237,170,37,114,162,12,1,135,156,70,24,119,179,218,26,252,125,17,234,210,174,85,45,9,187,92,82,41,147,235,8,34,255,153,186,241,163,81,90,208,250,16,27,3,219,53,128,224,91,247,106,152,222,111,232,4,116,93,48,118,40,168,60,205,98,69,63,154,217,200,20,173,52,2,126,97,189,142,95,42,193,145,107,249,248,137,195,194,182,6,11,62,0,46,38,79,213,245,75,141,157,160,199,76,226,29,100,86,242,150,144,121,236,113,54,129,190,31,131,94,244,134,33,96,181,211,127,214,19,253,178,167,44,139,61,47,227,159,64);
RotoreA = new Array(99,218,0,90,83,190,65,72,67,220,4,138,121,8,219,25,208,172,151,154,177,36,49,216,103,137,166,236,93,171,32,142,17,22,200,21,23,113,148,61,249,242,156,60,150,6,212,31,191,115,41,54,140,46,104,229,147,24,69,204,170,92,162,159,59,135,255,101,106,1,188,118,126,246,226,125,252,198,98,9,48,192,239,86,120,81,77,97,145,227,202,19,128,10,68,181,217,116,78,201,11,231,158,232,124,215,167,14,155,180,122,107,105,174,45,47,210,244,230,193,228,2,183,5,134,43,163,70,30,53,76,111,146,58,73,75,100,51,139,109,161,254,223,102,18,89,225,238,253,3,57,234,175,213,39,79,20,222,132,240,168,44,205,55,82,194,62,52,224,130,74,179,112,12,186,35,235,248,176,206,108,29,144,141,169,91,233,165,7,153,250,129,237,38,114,184,63,37,27,178,95,203,64,157,50,87,33,196,189,143,149,136,94,85,71,96,40,164,195,56,84,221,182,119,28,160,123,66,110,209,251,13,197,247,214,127,133,88,42,207,173,241,80,187,117,185,131,15,152,243,34,245,16,211,199,26);

Riporto = new Array;

OutF = "";

//ROTORI IN ORDINE :
// A B C D E F G H I L N M O P Q W R T Y U


for ( k = 0; k < 20; k++ )
Riporto[k] = false;

for ( i = 0; i <= Fsize - 1; i++ )
{
	
ChrTemp =  char_to_ascii(inFILE[i] );
//cout<<"\n Il char da decodificare ha numero : "<<ChrTemp;



//cout<<"\n Valore RA : "<<RA;
// STEP 1
if ( ( ChrTemp - RA ) < 0 )
ChrTemp = ( ( ChrTemp - RA) + 256 );
else
ChrTemp = ChrTemp - RA;
//cout<<"\n SottRAzione CharTemp - RA risultato :"<<ChrTemp;
ChrTemp =  RotoreA[ChrTemp];
//cout<<"\n Valore nell new ArrayA di "<<ChrTemp;
// STEP 1

// STEP 2
//cout<<"\n SottRAzione CharTemp : "<<ChrTemp<< " - RB : "<<RB<<" risultato :"<<ChrTemp;
if ( ( ChrTemp - RB ) < 0 )
ChrTemp = ( ( ChrTemp - RB) + 256 );
else
ChrTemp = ChrTemp - RB;
//cout<<"\n Sottrazione CharTemp - RB risultato :"<<ChrTemp;
ChrTemp =  RotoreB[ChrTemp];
//cout<<"\n Valore nell new ArrayB di "<<ChrTemp;
// STEP 2

// STEP 3
if ( ( ChrTemp - RC ) < 0 )
ChrTemp = ( ( ChrTemp - RC) + 256 );
else
ChrTemp = ChrTemp - RC;
//cout<<"\n Sottrazione CharTemp - RC risultato :"<<ChrTemp;
ChrTemp =  RotoreC[ChrTemp];
//cout<<"\n Valore nell new ArrayC di "<<ChrTemp;
// STEP 3

// STEP 4
if ( ( ChrTemp - RD ) < 0 )
ChrTemp = ( ( ChrTemp - RD) + 256 );
else
ChrTemp = ChrTemp - RD;
//cout<<"\n Sottrazione CharTemp - RD risultato :"<<ChrTemp;
ChrTemp =  RotoreD[ChrTemp];
//cout<<"\n Valore nell new ArrayD di "<<ChrTemp;
// STEP 4

// STEP 5
if ( ( ChrTemp - RE ) < 0 )
ChrTemp = ( ( ChrTemp - RE) + 256 );
else
ChrTemp = ChrTemp - RE;
//cout<<"\n Sottrazione CharTemp - RE risultato :"<<ChrTemp;
ChrTemp =  RotoreE[ChrTemp];
//cout<<"\n Valore nell new ArrayE di "<<ChrTemp;
// STEP 5

// STEP 6
if ( ( ChrTemp - RF ) < 0 )
ChrTemp = ( ( ChrTemp - RF) + 256 );
else
ChrTemp = ChrTemp - RF;
//cout<<"\n Sottrazione CharTemp - RF risultato :"<<ChrTemp;
ChrTemp =  RotoreF[ChrTemp];
//cout<<"\n Valore nell new ArrayF di "<<ChrTemp;
// STEP 6

// STEP 7
if ( ( ChrTemp - RG ) < 0 )
ChrTemp = ( ( ChrTemp - RG) + 256 );
else
ChrTemp = ChrTemp - RG;
//cout<<"\n Sottrazione CharTemp - RG risultato :"<<ChrTemp;
ChrTemp =  RotoreG[ ChrTemp ];
//cout<<"\n Valore nell new ArrayG di "<<ChrTemp;
// STEP 7

// STEP 8
if ( ( ChrTemp - RH ) < 0 )
ChrTemp = ( ( ChrTemp - RH ) + 256 );
else
ChrTemp = ChrTemp - RH;
//cout<<"\n Sottrazione CharTemp - RH risultato :"<<ChrTemp;
ChrTemp =  RotoreH[ChrTemp];
//cout<<"\n Valore nell new ArrayH di "<<ChrTemp;
// STEP 8


// STEP 9
if ( ( ChrTemp - RI ) < 0 )
ChrTemp = ( ( ChrTemp - RI ) + 256 );
else
ChrTemp = ChrTemp - RI;
//cout<<"\n Sottrazione CharTemp - RI risultato :"<<ChrTemp;
ChrTemp =  RotoreI[ChrTemp];
//cout<<"\n Valore nell new ArrayI di "<<ChrTemp;
// STEP 9


// STEP 10
if ( ( ChrTemp - RL ) < 0 )
ChrTemp = ( ( ChrTemp - RL ) + 256 );
else
ChrTemp = ChrTemp - RL;
//cout<<"\n Sottrazione CharTemp - RL risultato :"<<ChrTemp;
ChrTemp =  RotoreL[ChrTemp];
//cout<<"\n Valore nell new ArrayL di "<<ChrTemp;
// STEP 10


// STEP 11
if ( ( ChrTemp - RN ) < 0 )
ChrTemp = ( ( ChrTemp - RN ) + 256 );
else
ChrTemp = ChrTemp - RN;
//cout<<"\n Sottrazione CharTemp - RN risultato :"<<ChrTemp;
ChrTemp =  RotoreN[ChrTemp];
//cout<<"\n Valore nell new ArrayN di "<<ChrTemp;
// STEP 11

// STEP 12
if ( ( ChrTemp - RM ) < 0 )
ChrTemp = ( ( ChrTemp - RM ) + 256 );
else
ChrTemp = ChrTemp - RM;
//cout<<"\n Sottrazione CharTemp - RM risultato :"<<ChrTemp;
ChrTemp =  RotoreM[ChrTemp];
//cout<<"\n Valore nell new ArrayM di "<<ChrTemp;
// STEP 12

// STEP 13
if ( ( ChrTemp - RO ) < 0 )
ChrTemp = ( ( ChrTemp - RO ) + 256 );
else
ChrTemp = ChrTemp - RO;
//cout<<"\n Sottrazione CharTemp - RO risultato :"<<ChrTemp;
ChrTemp =  RotoreO[ ChrTemp ];
//cout<<"\n Valore nell new ArrayO di "<<ChrTemp;
// STEP 13

// STEP 14
if ( ( ChrTemp - RP ) < 0 )
ChrTemp = ( ( ChrTemp - RP ) + 256 );
else
ChrTemp = ChrTemp - RP;
//cout<<"\n Sottrazione CharTemp - RP risultato :"<<ChrTemp;
ChrTemp =  RotoreP[ ChrTemp ];
//cout<<"\n Valore nell new ArrayP di "<<ChrTemp;
// STEP 14



// STEP 15
if ( ( ChrTemp - RQ ) < 0 )
ChrTemp = ( ( ChrTemp - RQ ) + 256 );
else
ChrTemp = ChrTemp - RQ;
//cout<<"\n Sottrazione CharTemp - RP risultato :"<<ChrTemp;
ChrTemp =  RotoreQ[ ChrTemp ];
//cout<<"\n Valore nell new ArrayP di "<<ChrTemp;
// STEP 15


// STEP 16
if ( ( ChrTemp - RW ) < 0 )
ChrTemp = ( ( ChrTemp - RW ) + 256 );
else
ChrTemp = ChrTemp - RW;
//cout<<"\n Sottrazione CharTemp - RW risultato :"<<ChrTemp;
ChrTemp =  RotoreW[ ChrTemp ];
//cout<<"\n Valore nell new ArrayW di "<<ChrTemp;
// STEP 16


// STEP 17
if ( ( ChrTemp - RR ) < 0 )
ChrTemp = ( ( ChrTemp - RR ) + 256 );
else
ChrTemp = ChrTemp - RR;
//cout<<"\n Sottrazione CharTemp - RR risultato :"<<ChrTemp;
ChrTemp =  RotoreR[ ChrTemp ];
//cout<<"\n Valore nell new ArrayR di "<<ChrTemp;
// STEP 17


// STEP 18
if ( ( ChrTemp - RT ) < 0 )
ChrTemp = ( ( ChrTemp - RT ) + 256 );
else
ChrTemp = ChrTemp - RT;
//cout<<"\n Sottrazione CharTemp - RT risultato :"<<ChrTemp;
ChrTemp =  RotoreT[ ChrTemp ];
//cout<<"\n Valore nell new ArrayT di "<<ChrTemp;
// STEP 18


// STEP 19
if ( ( ChrTemp - RY ) < 0 )
ChrTemp = ( ( ChrTemp - RY ) + 256 );
else
ChrTemp = ChrTemp - RY;
//cout<<"\n Sottrazione CharTemp - RY risultato :"<<ChrTemp;
ChrTemp =  RotoreY[ ChrTemp ];
//cout<<"\n Valore nell new ArrayY di "<<ChrTemp;
// STEP 19


// STEP 20
if ( ( ChrTemp - RU ) < 0 )
ChrTemp = ( ( ChrTemp - RU ) + 256 );
else
ChrTemp = ChrTemp - RU;
//cout<<"\n Sottrazione CharTemp - RU risultato :"<<ChrTemp;
ChrTemp =  RotoreU[ ChrTemp ];
//cout<<"\n Valore nell new ArrayU di "<<ChrTemp;
// STEP 20

OutF += String.fromCharCode(ChrTemp);
//inFILE[i] = chr(ChrTemp);




// incremento dei valori rotatore o decrementoi :P

if ( RgU == false )      //MODALITA ADDIZIONE
{
	
if ( ( RU + IncU ) > 255 ) // SE RISULTATO SBALLA
{

RU = ( ( RU + IncU ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[0] = true;	       //C'è Riporto .. 

}

else
{
RU = RU + IncU; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[0] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RU - IncU ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RU = ( ( RU - IncU ) + 256 ); // IL RISULTATO E' CORRETTO TRAMITE UN ADDIZIONE
Riporto [0] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RU = RU - IncU;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[0] = false;   // Non C'è nessun Riporto..
}

}

//////////////////////////////////////////// CILINDRO Y \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
if ( Riporto[0] == true )  // Se c'è Riporto..
{
	
// INCREMENTIAMO CILINDRO Y
if ( RgY == false )      //MODALITA ADDIZIONE
{

if ( ( RY + IncY ) > 255 ) // SE RISULTATO SBALLA
{

RY = ( ( RY + IncY ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[1] = true;	       //C'è Riporto .. 

}

else
{
RY = RY + IncY; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[1] = false; // Non c'è nessun Riporto
}


}

else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )

{

if ( ( RY - IncY ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RY = ( ( RY - IncY ) + 256 ); // IL RISULTATO E' CORRETTO TRAMITE UN ADDIZIONE
Riporto [1] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RY = RY - IncY;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[1] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCREMENTO DEL CILINDRO Y

	
                 
if ( Riporto[1] == true ) // Se è presente il Riporto[1]..
{



// INCREMENTIAMO IL CILINDRO T
if ( RgT == false )      //MODALITA ADDIZIONE
{
	
if ( ( RT + IncT ) > 255 ) // SE RISULTATO SBALLA
{

RT = ( ( RT + IncT ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[2] = true;	       //C'è Riporto .. 

}

else
{
RT = RT + IncT; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[2] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RT - IncT ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RT = ( ( RT - IncT ) + 256 ); // IL RISULTATO E' CORRETTO TRAMITE UN ADDIZIONE
Riporto [2] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RT = RT - IncT;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[2] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCREMENTO DEL CILINDRO T

if ( Riporto[2] == true )
{
// INCREMENTIAMO IL CILINDRO R
if ( RgR == false )      //MODALITA ADDIZIONE
{
	
if ( ( RR + IncR ) > 255 ) // SE RISULTATO SBALLA
{

RR = ( ( RR + IncR ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[3] = true;	       //C'è Riporto .. 

}

else
{
RR = RR + IncR; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[3] = false; // Non c'è nessun Riporto
}
}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{
if ( ( RR - IncR ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO
RR = ( ( RR - IncR ) + 256 ); // IL RISULTATO E' CORRETTO TRAMITE UN ADDIZIONE
Riporto [3] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RR = RR - IncR;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[3] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCREMENTO DEL CILINDRO R
	
		
if ( Riporto[3] == true )
{
// INCREMENTIAMO IL CILINDRO W
if ( RgW == false )      //MODALITA ADDIZIONE
{
	
if ( ( RW + IncW ) > 255 ) // SE RISULTATO SBALLA
{

RW = ( ( RW + IncW ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[4] = true;	       //C'è Riporto .. 

}

else
{
RW = RW + IncW; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[4] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RW - IncW ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RW = ( ( RW - IncW ) + 256 ); // IL RISULTATO E' CORRETTO TRAMITE UN ADDIZIONE
Riporto [4] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RW = RW - IncW;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[4] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCREMENTO DEL CILINDRO W
	
	




if ( Riporto[4] == true )
{
	



// INCRFMENTIAMO IL CILINDRO Q
if ( RgQ == false )      //MODALITA ADDIZIONE
{
	
if ( ( RQ + IncQ ) > 255 ) // SE RISULTATO SBALLA
{

RQ = ( ( RQ + IncQ ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[5] = true;	       //C'è Riporto .. 

}

else
{
RQ = RQ + IncQ; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[5] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RQ - IncQ ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RQ = ( ( RQ - IncQ ) + 256 ); // IL RISULTATO E' CORRFTTO TRAMITE UN ADDIZIONE
Riporto [5] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RQ = RQ - IncQ;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[5] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCRFMENTO DEL CILINDRO Q



if ( Riporto[5] == true )
{
	


// INCRGMENTIAMO IL CILINDRO P
if ( RgP == false )      //MODALITA ADDIZIONE
{
	
if ( ( RP + IncP ) > 255 ) // SE RISULTATO SBALLA
{

RP = ( ( RP + IncP ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[6] = true;	       //C'è Riporto .. 

}

else
{
RP = RP + IncP; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[6] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RP - IncP ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RP = ( ( RP - IncP ) + 256 ); // IL RISULTATO E' CORRGTTO TRAMITE UN ADDIZIONE
Riporto[6] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RP = RP - IncP;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[6] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCRGMENTO DEL CILINDRO P




if ( Riporto[6] == true )
{
	

// INCRHMENTIAMO IL CILINDRO O
if ( RgO == false )      //MODALITA ADDIZIONE
{
	
if ( ( RO + IncO ) > 255 ) // SE RISULTATO SBALLA
{

RO = ( ( RO + IncO ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[7] = true;	       //C'è Riporto .. 

}

else
{
RO = RO + IncO; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[7] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RO - IncO ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RO = ( ( RO - IncO ) + 256 ); // IL RISULTATO E' CORRHTTO TRAMITE UN ADDIZIONE
Riporto [7] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RO = RO - IncO;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[7] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCRHMENTO DEL CILINDRO O







if ( Riporto[7] == true )
{


// INCRIMENTIAMO IL CILINDRO M
if ( RgM == false )      //MODALITA ADDIZIONE
{
	
if ( ( RM + IncM ) > 255 ) // SE RISULTATO SBALLA
{

RM = ( ( RM + IncM ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[8] = true;	       //C'è Riporto .. 

}

else
{
RM = RM + IncM; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[8] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RM - IncM ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RM = ( ( RM - IncM ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto [8] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RM = RM - IncM;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[8] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCRIMENTO DEL CILINDRO M

if ( Riporto[8] )
{
		
// INCRIMENTIAMO IL CILINDRO N
if ( RgN == false )      //MODALITA ADDIZIONE
{
	
if ( ( RN + IncN ) > 255 ) // SE RISULTATO SBALLA
{

RN = ( ( RN + IncN ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[9] = true;	       //C'è Riporto .. 

}

else
{
RN = RN + IncN; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[9] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RN - IncN ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RN = ( ( RN - IncN ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto [9] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RN = RN - IncN;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[9] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCRIMENTO DEL CILINDRO N


if ( Riporto[9] == true )
{
// INCRIMENTIAMO IL CILINDRO L
if ( RgL == false )      //MODALITA ADDIZIONE
{
	
if ( ( RL + IncL ) > 255 ) // SE RISULTATO SBALLA
{

RL = ( ( RL + IncL ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[10] = true;	       //C'è Riporto .. 

}

else
{
RL = RL + IncL; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[10] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RL - IncL ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RL = ( ( RL - IncL ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto [10] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RL = RL - IncL;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[10] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCRIMENTO DEL CILINDRO L

if ( Riporto[10] == true )
{


// INCRIMENTIAMO IL CILINDRO I
if ( RgI == false )      //MODALITA ADDIZIONE
{
	
if ( ( RI + IncI ) > 255 ) // SE RISULTATO SBALLA
{

RI = ( ( RI + IncI ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORMALI..
Riporto[11] = true;	       //C'è Riporto .. 

}

else
{
RI = RI + IncI; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[11] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RI - IncI ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RI = ( ( RI - IncI ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto [11] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RI = RI - IncI;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[11] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCRIMENTO DEL CILINDRO I











if ( Riporto[11] == true )
{


// INCRIMENTIAMO IL CILINDRO H
if ( RgH == false )      //MODALITA ADDIZIONE
{
	
if ( ( RH + IncH ) > 255 ) // SE RISULTATO SBALLA
{

RH = ( ( RH + IncH ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NOROALI..
Riporto[12] = true;	       //C'è Riporto .. 

}

else
{
RH = RH + IncH; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRO
Riporto[12] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRO RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RH - IncH ) < 0 )
{      // SE IL RISULTATO E' TROPPO PICCOLO

RH = ( ( RH - IncH ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto [12] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RH = RH - IncH;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[12] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCRIMENTO DEL CILINDRO H


if ( Riporto[12] == true )
{

// INCRIMENTIAMO IL CILINDRP G
if ( RgG == false )      //MODALITA ADDIZIONE
{
	
if ( ( RG + IncG ) > 255 ) // SE RISULTATO SBALLA
{

RG = ( ( RG + IncG ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORPALI..
Riporto[13] = true;	       //C'è Riporto .. 

}

else
{
RG = RG + IncG; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRP
Riporto[13] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRP RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RG - IncG ) < 0 )
{      // SE IL RISULTATO E' TRPPPO PICCOLO

RG = ( ( RG - IncG ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto [13] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RG = RG - IncG;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[13] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCRIMENTO DEL CILINDRP G


if ( Riporto[13] == true )
{


// INCRIMENTIAMO IL CILINDRQ F
if ( RgF == false )      //MODALITA ADDIZIONE
{
	
if ( ( RF + IncF ) > 255 ) // SE RISULTATO SBALLA
{

RF = ( ( RF + IncF ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORFALI..
Riporto[14] = true;	       //C'è Riporto .. 

}

else
{
RF = RF + IncF; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRF
Riporto[14] = false; // Non c'è nessun Riporto
}


}
else // IN FUESTO CASO IL CILINDRF RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RF - IncF ) < 0 )
{      // SE IL RISULTATO E' TRFPPO PICCOLO
RF = ( ( RF - IncF ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto [14] = true; // c'è Riporto..
}

else			      // ALTRIMENTI..
{
RF = RF - IncF;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[14] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCRIMENTO DEL CILINDRF F

if ( Riporto[14] == true )
{
// INCRIMENTIAMO IL CILINDRW E
if ( RgE == false )      //MODALITA ADDIZIONE
{
	
if ( ( RE + IncE ) > 255 ) // SE RISULTATO SBALLA
{

RE = ( ( RE + IncE ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NOREALI..
Riporto[15] = true;	       //C'è Riporto .. 

}

else
{
RE = RE + IncE; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRE
Riporto[15] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRE RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RE - IncE ) < 0 )
{      // SE IL RISULTATO E' TREPPO PICCOLO

RE = ( ( RE - IncE ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto [15] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RE = RE - IncE;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[15] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCRIMENTO DEL CILINDRE E









if ( Riporto[15] == true )
{

// INCRIMENTIAMO IL CILINDRR D
if ( RgD == false )      //MODALITA ADDIZIONE
{
	
if ( ( RD + IncD ) > 255 ) // SE DISULTATO SBALLA
{

RD = ( ( RD + IncD ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORRALI..
Riporto[16] = true;	       //C'è Riporto .. 

}

else
{
RD = RD + IncD; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRR
Riporto[16] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRR RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RD - IncD ) < 0 )
{      // SE IL RISULTATO E' TRRPPO PICCOLO

RD = ( ( RD - IncD ) + 256 ); // IL RISULTATO E' CORRITTO TRAMITE UN ADDIZIONE
Riporto [16] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RD = RD - IncD;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[16] = false;   // Non C'è nessun Riporto..
}

}
// FINE INCRIMENTO DEL CILINDRR D


if ( Riporto[17] == true )
{


// IncTIMENTIAMO IL CILINDRT C
if ( RgC == false )      //MODALITA ADDIZIONE
{
	
if ( ( RC + IncC ) > 255 ) // SE RISULTATO SBALLA
{

RC = ( ( RC + IncC ) - 256 );  // IL RISULTATO VIENE RIPORTATO A VALORI NORTALI..
Riporto[18] = true;	       //C'è Riporto .. 

}

else
{
RC = RC + IncC; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRT
Riporto[18] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRT RUOTA IN SENSO CONTRARIO ( VIRTUALMENTE .. )
{

if ( ( RC - IncC ) < 0 )
{      // SE IL RISULTATO E' TRTPPO PICCOLO

RC = ( ( RC - IncC ) + 256 ); // IL RISULTATO E' CORTITTO TRAMITE UN ADDIZIONE
Riporto [18] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RC = RC - IncC;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[18] = false;   // Non C'è nessun Riporto..
}

}
// FINE IncTIMENTO DEL CILINDRT C









if ( Riporto[18] == true )
{


// IncYIMENTIAMO IL CILINDRY B
if ( RgB == false )      //MODALITA ADDIZIONE
{
	
if ( ( RB + IncB ) > 255 ) // SE RISULTATO SBALLA
{

RB = ( ( RB + IncB ) - 256 );  // IL RISULTATO VIENE RIPORBATO A VALORI NORBALI..
Riporto[19] = true;	       //C'è Riporto .. 

}

else
{
RB = RB + IncB; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRB
Riporto[19] = false; // Non c'è nessun Riporto
}


}
else // IN QUESTO CASO IL CILINDRB RUOTA IN SENSO CONTRARIO ( VIRBUALMENTE .. )
{

if ( ( RB - IncB ) < 0 )
{      // SE IL RISULTATO E' TRYPPO PICCOLO

RB = ( ( RB - IncB ) + 256 ); // IL RISULTATO E' CORYITTO TRAMITE UN ADDIZIONE
Riporto [19] = true; // c'è Riporto..

}

else			      // ALTRIMENTI..
{
RB = RB - IncB;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
Riporto[19] = false;   // Non C'è nessun Riporto..
}

}
// FINE IncYIMENTO DEL CILINDRY B








if ( Riporto[19] == true )
{



// IncUIMENTIAMO IL CILINDRU A
if ( RgA == false )      //MODALITA ADDIZIONE
{
	
if ( ( RA + IncA ) > 255 ) // SE RISULTATO SBALLA
{
RA = ( ( RA + IncA ) - 256 );  // IL RISULTATO VIENE RIPORUATO A VALORI NORUALI..
}

else
{
RA = RA + IncA; // SE IL RISULTATO NON SBALLA UNA SEMPLICE ADDIZIONE RUOTA IL CILINDRU
}


}
else // IN QUESTO CASO IL CILINDRU RUOTA IN SENSO CONTRARIO ( VIRUUALMENTE .. )
{

if ( ( RA - IncA ) < 0 )
{      // SE IL RISULTATO E' TRUPPO PICCOLO

RA = ( ( RA - IncA ) + 256 ); // IL RISULTATO E' CORUITTO TRAMITE UN ADDIZIONE

}

else			      // ALTRIMENTI..
{
RA = RA - IncA;		      // UNA SOTTRAZIONE E PASSA LA PAURA 
}

}
// FINE IncUIMENTO DEL CILINDRU A





}}}}}}}}}}}}}}}}}}}



}

ModA = RU;
ModB = RY;
ModC = RT;
ModD = RR;
ModE = RW;
ModF = RQ;
ModG = RP;
ModH = RO;
ModI = RM;
ModL = RN;
ModN = RL;
ModM = RI;
ModO = RH;
ModP = RG;
ModQ = RF;
ModW = RE;
ModR = RD;
ModT = RC;
ModY = RB;
ModU = RA;

return ( OutF );
}





// Questa funzione ricava la chiave dalla password inmessa e la salva nelle 30 variabili..
function X_Crypt_String(Stringa, Password, Base64 )
{

LenPwl = Password.length;
passWord = Password;
RA = 0; RB = 0; RC = 0; RD = 0; RE = 0; RF = 0; RG = 0; RH = 0; RI = 0; RL = 0; RN = 0; RM = 0; RO = 0; RP = 0; RQ = 0; RW = 0; RR = 0; RT = 0; RY = 0; RU = 0; incA = 1; incB = 1; incC = 1; incD = 1; incE = 1; incF = 1; incG = 1; incH = 1; incI = 1; incL = 1; incN = 1; incM = 1; incO = 1; incP = 1; incQ = 1; incW = 1; incR = 1; incT = 1; incY = 1; incU = 1; //Parametri primari dell Enigma
RgA = false; RgB = false; RgC = false; RgD = false; RgE = false; RgF = false; RgG = false; RgH = false; RgI = false; RgL = false; RgN = false; RgM = false; RgO = false; RgP = false; RgQ = false; RgW = false; RgR = false; RgT = false; RgY = false; RgU = false;

ArTemp = new Array();
ArBool = new Array();

count = 0;
maxcount = 0;
j = 0;

//
// PRIMO PASSO : RICAVARE DALLA CHIAVE I VALORI INIZIALI DA ASSEGNARE AI CILINDRI
//

for ( i = 0; i < 256; i++ )
ArTemp[i] = 0;

for ( i = 0; i < 20; i++ )
ArBool[i] = false;

for ( i = 1; i < LenPwl; i++ )
{
ArTemp[count] = char_to_ascii(String.fromCharCode(passWord.charCodeAt(j) ^ passWord.charCodeAt(i)));
count++;
}

if ( count < 19 )
{
	for ( i = 0; i < ( LenPwl - count ); i++ )
	{
	ArTemp[count] = char_to_ascii( passWord[i] );
	count++;	
	}
}


// new ArrayTEMPORANEO CARICO..


// ASSEGNAZIONE DELLE POSIZIONI INIZIALI DEI CILINDRI
		RA = ArTemp[0];
		RB = ArTemp[1];
		RC = ArTemp[2];
		RD = ArTemp[3];
		RE = ArTemp[4];
		RF = ArTemp[5];
		RG = ArTemp[6];
		RH = ArTemp[7];
		RI = ArTemp[8];
		RL = ArTemp[9];
		RN = ArTemp[10];
		RM = ArTemp[11];
		RO = ArTemp[12];
		RP = ArTemp[13];
		RQ = ArTemp[14];
		RW = ArTemp[15];
		RR = ArTemp[16];
		RT = ArTemp[17];
		RY = ArTemp[18];
		RU = ArTemp[19];
// FINE ASSEGNAZIONE POSIZIONI INIZIALI DEI CILINDRI


////////////////////////
//  FINE PRIMO PASSO  //
////////////////////////




//
// SECONDO PASSO : ATABILIRE I VERSI DI ROTAZIONE DEI 20 CILINDRI A SECONDA DELLA PASSWORD
//

count = 0;
if ( LenPwl >= 20 )
maxcount = LenPwl - 20;
else
maxcount = 0;

for ( i = LenPwl - 1 ; i > maxcount; i-- )
{
	if ( char_to_ascii( passWord[i] ) %2 != 0 )
	ArBool[count] = true;
	else
	ArBool[count] = false;
	count++;
}
		while ( count < 20 )
		{
			if (  ArTemp[ count ] %2 != 0 )
			ArBool[ count ] = true;
			else
			ArBool[ count ] = false;
			count++;
		}

// ASSEGNAZIONE DAI VERSI DI ROTAZIONE AI CILINDRI
		RgA = ArBool[0];
		RgB = ArBool[1];
		RgC = ArBool[2];
		RgD = ArBool[3];
		RgE = ArBool[4];
		RgF = ArBool[5];
		RgG = ArBool[6];
		RgH = ArBool[7];
		RgI = ArBool[8];
		RgL = ArBool[9];
		RgN = ArBool[10];
		RgM = ArBool[11];
		RgO = ArBool[12];
		RgP = ArBool[13];
		RgQ = ArBool[14];
		RgW = ArBool[15];
		RgR = ArBool[16];
		RgT = ArBool[17];
		RgY = ArBool[18];
		RgU = ArBool[19];
// ASSEGNAZIONE DAI VERSI DI ROTAZIONE AI CILINDRI


//
// TERZO PASSO : INDICI DI ROTAZIONE DEI CILINDRI...
//

count = 0;

if ( LenPwl > 20 )
{
	j = 0;
	
	for ( i = ( ( LenPwl / 2 ) - 10 ); i < ( ( LenPwl / 2 ) + 10 ); i++ )
	{
		if ( ( char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] ) ) > 255 )
		ArTemp[ count ] = ( ( char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] ) ) - 256 );
		else
		ArTemp[ count ] = char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] );
		count++;
		j++;
	}

}


else
{
	for ( i = 0; i < LenPwl; i++ )
	{
		if ( ( char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] ) ) > 255 )
		ArTemp[ count ] = ( ( char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] ) ) - 256 );
		else
		ArTemp[ count ] = char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] );
		count++;
	}

if ( count < 19 )
	{
 j = count;
			for ( i = ( LenPwl - 1 ); i > ( LenPwl - j - 1 ); i-- )
			{
                        ArTemp[ count ] = char_to_ascii ( passWord[i] );
			count++;
			}
	}

}
// ASSEGNAZIONE DAI VERSI DI ROTAZIONE AI CILINDRI
		incA = ArTemp[0];
		incB = ArTemp[1];
		incC = ArTemp[2];
		incD = ArTemp[3];
		incE = ArTemp[4];
		incF = ArTemp[5];
		incG = ArTemp[6];
		incH = ArTemp[7];
		incI = ArTemp[8];
		incL = ArTemp[9];
		incN = ArTemp[10];
		incM = ArTemp[11];
		incO = ArTemp[12];
		incP = ArTemp[13];
		incQ = ArTemp[14];
		incW = ArTemp[15];
		incR = ArTemp[16];
		incT = ArTemp[17];
		incY = ArTemp[18];
		incU = ArTemp[19];
		
		
		
ArrayOrdinePwl = ordinepwl( Password, Password.length );

Stringa =  XtEnigma( Stringa, Stringa.length, RA, RB, RC, RD, RE, RF, RG, RH, RI, RL, RN, RM, RO, RP, RQ, RW, RR, RT, RY, RU, RgA, RgB, RgC, RgD, RgE, RgF, RgG, RgH, RgI, RgL, RgN, RgM, RgO, RgP, RgQ, RgW, RgR, RgT, RgY, RgU, incA, incB, incC, incD, incE, incF, incG, incH, incI, incL, incN, incM, incO, incP, incQ, incW, incR, incT, incY, incU, RA, RB, RC, RD, RE, RF, RG, RH, RI, RL, RN, RM, RO, RP, RQ, RW, RR, RT, RY, RU );
Stringa = cfr ( Stringa, Password, Stringa.length, Password.length );
Stringa = ordine(Stringa, Password, Stringa.length, Password.length, ArrayOrdinePwl);
if ( Base64 == true )
Stringa = base64Encode(Stringa);
return (Stringa);
}




// Questa funzione ricava la chiave dalla password inmessa e la salva nelle 30 variabili..
function X_DeCrypt_String(Stringa, Password, Base64 )
{

LenPwl = Password.length;
passWord = Password;
RA = 0; RB = 0; RC = 0; RD = 0; RE = 0; RF = 0; RG = 0; RH = 0; RI = 0; RL = 0; RN = 0; RM = 0; RO = 0; RP = 0; RQ = 0; RW = 0; RR = 0; RT = 0; RY = 0; RU = 0; incA = 1; incB = 1; incC = 1; incD = 1; incE = 1; incF = 1; incG = 1; incH = 1; incI = 1; incL = 1; incN = 1; incM = 1; incO = 1; incP = 1; incQ = 1; incW = 1; incR = 1; incT = 1; incY = 1; incU = 1; //Parametri primari dell Enigma
RgA = false; RgB = false; RgC = false; RgD = false; RgE = false; RgF = false; RgG = false; RgH = false; RgI = false; RgL = false; RgN = false; RgM = false; RgO = false; RgP = false; RgQ = false; RgW = false; RgR = false; RgT = false; RgY = false; RgU = false;

ArTemp = new Array();
ArBool = new Array();

count = 0;
maxcount = 0;
j = 0;

//
// PRIMO PASSO : RICAVARE DALLA CHIAVE I VALORI INIZIALI DA ASSEGNARE AI CILINDRI
//

for ( i = 0; i < 256; i++ )
ArTemp[i] = 0;

for ( i = 0; i < 20; i++ )
ArBool[i] = false;

for ( i = 1; i < LenPwl; i++ )
{
ArTemp[count] = char_to_ascii(String.fromCharCode(passWord.charCodeAt(j) ^ passWord.charCodeAt(i)));
count++;
}

if ( count < 19 )
{
	for ( i = 0; i < ( LenPwl - count ); i++ )
	{
	ArTemp[count] = char_to_ascii( passWord[i] );
	count++;	
	}
}


// new ArrayTEMPORANEO CARICO..


// ASSEGNAZIONE DELLE POSIZIONI INIZIALI DEI CILINDRI
		RA = ArTemp[0];
		RB = ArTemp[1];
		RC = ArTemp[2];
		RD = ArTemp[3];
		RE = ArTemp[4];
		RF = ArTemp[5];
		RG = ArTemp[6];
		RH = ArTemp[7];
		RI = ArTemp[8];
		RL = ArTemp[9];
		RN = ArTemp[10];
		RM = ArTemp[11];
		RO = ArTemp[12];
		RP = ArTemp[13];
		RQ = ArTemp[14];
		RW = ArTemp[15];
		RR = ArTemp[16];
		RT = ArTemp[17];
		RY = ArTemp[18];
		RU = ArTemp[19];
// FINE ASSEGNAZIONE POSIZIONI INIZIALI DEI CILINDRI


////////////////////////
//  FINE PRIMO PASSO  //
////////////////////////




//
// SECONDO PASSO : ATABILIRE I VERSI DI ROTAZIONE DEI 20 CILINDRI A SECONDA DELLA PASSWORD
//

count = 0;
if ( LenPwl >= 20 )
maxcount = LenPwl - 20;
else
maxcount = 0;

for ( i = LenPwl - 1 ; i > maxcount; i-- )
{
	if ( char_to_ascii( passWord[i] ) %2 != 0 )
	ArBool[count] = true;
	else
	ArBool[count] = false;
	count++;
}
		while ( count < 20 )
		{
			if (  ArTemp[ count ] %2 != 0 )
			ArBool[ count ] = true;
			else
			ArBool[ count ] = false;
			count++;
		}

// ASSEGNAZIONE DAI VERSI DI ROTAZIONE AI CILINDRI
		RgA = ArBool[0];
		RgB = ArBool[1];
		RgC = ArBool[2];
		RgD = ArBool[3];
		RgE = ArBool[4];
		RgF = ArBool[5];
		RgG = ArBool[6];
		RgH = ArBool[7];
		RgI = ArBool[8];
		RgL = ArBool[9];
		RgN = ArBool[10];
		RgM = ArBool[11];
		RgO = ArBool[12];
		RgP = ArBool[13];
		RgQ = ArBool[14];
		RgW = ArBool[15];
		RgR = ArBool[16];
		RgT = ArBool[17];
		RgY = ArBool[18];
		RgU = ArBool[19];
// ASSEGNAZIONE DAI VERSI DI ROTAZIONE AI CILINDRI


//
// TERZO PASSO : INDICI DI ROTAZIONE DEI CILINDRI...
//

count = 0;

if ( LenPwl > 20 )
{
	j = 0;
	
	for ( i = ( ( LenPwl / 2 ) - 10 ); i < ( ( LenPwl / 2 ) + 10 ); i++ )
	{
		if ( ( char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] ) ) > 255 )
		ArTemp[ count ] = ( ( char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] ) ) - 256 );
		else
		ArTemp[ count ] = char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] );
		count++;
		j++;
	}

}


else
{
	for ( i = 0; i < LenPwl; i++ )
	{
		if ( ( char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] ) ) > 255 )
		ArTemp[ count ] = ( ( char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] ) ) - 256 );
		else
		ArTemp[ count ] = char_to_ascii ( passWord[j] ) + char_to_ascii ( passWord[i] );
		count++;
	}

if ( count < 19 )
	{
 j = count;
			for ( i = ( LenPwl - 1 ); i > ( LenPwl - j - 1 ); i-- )
			{
                        ArTemp[ count ] = char_to_ascii ( passWord[i] );
			count++;
			}
	}

}
// ASSEGNAZIONE DAI VERSI DI ROTAZIONE AI CILINDRI
		incA = ArTemp[0];
		incB = ArTemp[1];
		incC = ArTemp[2];
		incD = ArTemp[3];
		incE = ArTemp[4];
		incF = ArTemp[5];
		incG = ArTemp[6];
		incH = ArTemp[7];
		incI = ArTemp[8];
		incL = ArTemp[9];
		incN = ArTemp[10];
		incM = ArTemp[11];
		incO = ArTemp[12];
		incP = ArTemp[13];
		incQ = ArTemp[14];
		incW = ArTemp[15];
		incR = ArTemp[16];
		incT = ArTemp[17];
		incY = ArTemp[18];
		incU = ArTemp[19];
		
		
		
		
ArrayOrdinePwl = ordinepwl( Password, Password.length );

if ( Base64 == true )
Stringa = base64Decode(Stringa);
Stringa = deordine( Stringa, Password, Stringa.length, Password.length, ArrayOrdinePwl );
Stringa = cfr ( Stringa, Password, Stringa.length, Password.length );
Stringa =  XtEnigmaD( Stringa, Stringa.length, RA, RB, RC, RD, RE, RF, RG, RH, RI, RL, RN, RM, RO, RP, RQ, RW, RR, RT, RY, RU, RgA, RgB, RgC, RgD, RgE, RgF, RgG, RgH, RgI, RgL, RgN, RgM, RgO, RgP, RgQ, RgW, RgR, RgT, RgY, RgU, incA, incB, incC, incD, incE, incF, incG, incH, incI, incL, incN, incM, incO, incP, incQ, incW, incR, incT, incY, incU, RA, RB, RC, RD, RE, RF, RG, RH, RI, RL, RN, RM, RO, RP, RQ, RW, RR, RT, RY, RU );
return (Stringa);
}
