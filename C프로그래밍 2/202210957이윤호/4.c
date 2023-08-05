#include <stdio.h>

int main (void)
{
	long number,binary,sum=0,i=1;
	printf("enter decimal number:");
	scanf("%ld",&number);
	while (number>0)	/* decimal into binary*/
	{
		binary = number%2;
		sum+=binary*i;
		number=number/2;
		i*=10;
	}
	printf("%ld\n",sum);
	return 0;
}
