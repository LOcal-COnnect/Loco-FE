#include <stdio.h>
#include <string.h>

int main (void)
{
	char input[1000];
	char word[1000];
	char words[1000][1000];
	int count= 0;
	int reverse=0;

	scanf("%[^\n]s",input);
	int i=0,j=0;
	while(input[i]!='\0'){
		if(input[i]==' '){
			word[j]='\0';
			
			if(strcmp(word,"-r")==0){
				reverse=-1;
			} else {
				strcpy(words[count],word);
				count++;
			}
			j = 0;
		} else{
			word[j]=input[i];
			j++;
		}
		i++;
	}
	word[j]='\0';
	if(strcmp(word,"-r")==0) {
		reverse=1;
	} else {
		strcpy(words[count],word);
		count++;
	}

	if(reverse==0) {
		for(int i=0;i<count;i++) {
			printf("%s ", words[i]);
		}
	} else {
		for(int i = count-1;i>=0;i--) {
			printf("%s ",words[i]);
		}
	}

	printf("\n");
	return 0;
}
