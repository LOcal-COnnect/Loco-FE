#include <stdio.h>
#include <stdlib.h>

#define MAXOP 100 


void main(void)
{
	// declare variable 
	int i,j = 0;// initialize a counter variable
	char c;
	char operator = '0'; // declare a character variable to store the operator
	char formula[MAXOP]; //declare a character array to store the input formula
	double number1, number2 = 0.0; // declare a double variables (numbers)
	char number1_string[20]; // declare a character array to store the first number
	char number2_string[20]; // declare a character array to store the second number
	int is_decimal1 = 0;      // initialize a flag variable to keep track of decimal point
	int is_decimal2 = 0;

	// while in while
	while(( c = getchar() ) != EOF)
	{ 
		formula[i] = c;
		i++;
	    	// read the input formula character by character until the newline character is encountered
	    	while ((formula[i] = getchar()) != '\n') 
	   	{
			if (formula[i] != ' ') //skip the space 
			{
		    	i++;
			}
	    	}


	    	formula[i] = '\0';   // terminate the formula string with a null character

	    	i = 0;

	    	// parse the formula string to separate the first number, operator, and second number
	    	while (formula[i] >= '0' && formula[i] <= '9' || formula[i] == '.') 
		{
			if (formula[i] == '.') 
			{
			    number1_string[i] = formula[i];
			    is_decimal1 = 1;
			} 
			else 
			{
			    if (is_decimal1) 
			    {
			       number1_string[i] = formula[i];
			    } 
			    else 
			    {
			       number1_string[i] = formula[i];
			    }	
			}
			i++;
	    	}
	    	number1_string[i] = '\0'; //string1 end
	    	operator = formula[i]; // operator storing
	    	i++;

	    	while (formula[i] >= '0' && formula[i] <= '9' || formula[i] == '.') {
			if (formula[i] == '.') 
			{
			    number2_string[j] = formula[i];
			    is_decimal2 = 1;
			} 
			else 
			{
			    if (is_decimal2) 
			    {
			        number2_string[j] = formula[i];
			    } 
			    else 
			    {
			        number2_string[j] = formula[i];
			    }
			}
			i++;
			j++;
	    	}	
	    	number2_string[j] = '\0'; // string2 end

	//	printf("%s%c%s \n", number1_string, operator, number2_string);

		switch(operator)
		{
			// 1. if num == float 2. num == int
			case '+' :
				if(is_decimal1 == 1 || is_decimal2 == 1)
					printf("%lf\n", atof(number1_string) + atof(number2_string));
				else
					printf("%d\n", (int)atof(number1_string) + (int)atof(number2_string));
				break;
			case '-' :
	
				if(is_decimal1 == 1 || is_decimal2 == 1)
					printf("%lf\n", atof(number1_string) - atof(number2_string));
				else
					printf("%d\n", (int)atof(number1_string) - (int)atof(number2_string));
				break;
			case '*' :
				if(is_decimal1 == 1 || is_decimal2 == 1)
					printf("%lf\n", atof(number1_string) * atof(number2_string));
				else
					printf("%d\n", (int)atof(number1_string) * (int)atof(number2_string));
				break;
			case '/' :
				if(atof(number2_string) != 0.0)
				{	
					if(is_decimal1 == 1 || is_decimal2 == 1)
						printf("%lf\n", atof(number1_string) / atof(number2_string));
					else
						printf("%d\n", (int)atof(number1_string) / (int)atof(number2_string));
				}
				else
					printf("error, can't devide by 0");
				break;
			
			case '%' :
				if(is_decimal1 == 0 && is_decimal2 == 0)  
					printf("%d\n", (int)atof(number1_string) % (int)atof(number2_string));
				else 
					printf("error, can't modulo by floating number");
				break;
		}
		//initializing loop control variables
		is_decimal1 = 0;
		is_decimal2 = 0;
		i = 0;
		j = 0;
	}
}
			

	
		
