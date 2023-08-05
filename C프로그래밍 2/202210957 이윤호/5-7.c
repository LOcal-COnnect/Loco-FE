#include <stdio.h>
#include <stdlib.h>
#include <string.h>
//function compare
int compare(const void *a, const void *b) {
	return (*(int*)a-*(int*)b);
}

int main (void)
{
	char option[3];
	int nums[4];
	scanf("%s",option);
	for(int i = 0;i<4;i++)
		scanf("%d",&nums[i]);

	if(strcmp(option,"-n")==0){
		qsort(nums,4,sizeof(int),compare);
	} else{
		qsort(nums,4,sizeof(int),compare);
		int temp;
		for(int i = 0; i<2;i++){
			temp=nums[i];
			nums[i]=nums[3-i];
			nums[3-i]=temp;
		}
	}
	printf("After sort\n");
	for(int i = 0;i<4;i++)
		printf("%d\n",nums[i]);
	printf("\n");

	return 0;
}
