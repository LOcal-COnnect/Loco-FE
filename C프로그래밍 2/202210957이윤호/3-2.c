#include <stdio.h>
#include <stdlib.h>

#define MAX 100 


void main(void)
{

	int i = 0;
	int w = 0;
	int dec1, dec2 = 0;      /*initialize a flag variable to keep track*/
	char a;
	char operator = '0'; /*declare character variable*/
	char fom[MAX]; /*declare character array*/
	double num1, num2 = 0.0; /*declare double variables*/
	char num1str[20]; 
	char num2str[20]; 

	while(( a  = getchar() ) != EOF)
	{ 
		fom[i] = a;
		i++;
	    	while ((fom[i] = getchar()) != '\n') 
	   	{
			if (fom[i] != ' ')
			{
		    	i++;
			}
	    	}


	    	fom[i] = '\0';   /* terminate the formula string with a null char */

	    	i = 0;

	    	/* separate the first number, operator, and second number */
	    	while (fom[i] >= '0' && fom[i] <= '9' || fom[i] == '.') 
		{
			if (fom[i] == '.') 
			{
			    num1str[i] = fom[i];
			    dec1 = 1;
			} 
			
			else 
			{
			    if (dec1) 
			    {
			       num1str[i] = fom[i];
			    } 
			    else 
			    {
			       num1str[i] = fom[i];
			    }	
			}
			i++;
	    	}
	    	num1str[i] = '\0';
	    	operator = fom[i]; /* operator storing */
	    	i++;

	    	while (fom[i] >= '0' && fom[i] <= '9' || fom[i] == '.') {
			if (fom[i] == '.') 
			{
			    num2str[w] = fom[i];
			    dec2 = 1;
			} 

			else 
			{
			    if (dec2) 
			    {
			        num2str[w] = fom[i];
			    } 
			    else 
			    {
			        num2str[w] = fom[i];
			    }
			}
			i++;
			w++;
	    	}	
	    	num2str[w] = '\0'; 

		switch(operator)
		{
			case '+' :
				if(dec1 == 1 || dec2 == 1)
					printf("%lf\n", atof(num1str)+atof(num2str));
				else
					printf("%d\n", (int)atof(num1str)+(int)atof(num2str));
				break;
			case '-' :
	
				if(dec1 == 1 || dec2 == 1)
					printf("%lf\n", atof(num1str)-atof(num2str));
				else
					printf("%d\n", (int)atof(num1str)-(int)atof(num2str));
				break;
			case '*' :
				if(dec1 == 1 || dec2 == 1)
					printf("%lf\n", atof(num1str)*atof(num2str));
				else
					printf("%d\n", (int)atof(num1str)*(int)atof(num2str));
				break;
			case '%':
				if (dec1 == 0 && dec2 == 0)
					printf("%d\n", (int)atof(num1str)%(int)atof(num2str));
				else
					printf("ERROR");
				break;
			case '/' :
				if(atof(num2str) != 0.0)
				{	
					if(dec1 == 1 || dec2 == 1)
						printf("%lf\n", atof(num1str)/atof(num2str));
					else
						printf("%d\n", (int)atof(num1str)/(int)atof(num2str));
				}
				else
					printf("ERROR");
				break;
			
		}
		i = 0;
		w = 0;
		dec1 = 0;
		dec2 = 0;
	}
}
			

	
		
