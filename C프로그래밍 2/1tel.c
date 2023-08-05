#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ncurses.h>

#define MAX 100 //for easy editing

typedef struct {
    char name[30];
    char phone[20];
    char memo[40];
} Address;

typedef struct {
    Address list[MAX];
    int count;
} Info;

#define MENU_ITEMS_COUNT 4

typedef struct {
    char title[20];
    void (*function)();
} MenuItem;

void searchFunction(Info* information, char* query)  //Function for search
{
    attron(A_BOLD);
    attron(COLOR_PAIR(2));
    printw("Performing add functionality.\n");
    attroff(COLOR_PAIR(2));
    attroff(A_BOLD);
    refresh();
    getch();

    int match = 0;  //Show the order of the data, Role to indicate the presence or absence of a match

    for (int i = 0; i < information->count; i++)
    {
        if (strstr(information->list[i].name, query) != NULL || strstr(information->list[i].phone, query) != NULL || strstr(information->list[i].memo, query) != NULL)
        {
            printf("%d %s %s %s\n", match + 1, information->list[i].name, information->list[i].phone, information->list[i].memo);   //Print matching data
            match++;
        }
    }

    if (match != 0)
        printf("match found.\n");
    else
        printf("no match found.\n");

}

void addFunction(Info* information, char* name, char* phone, char* memo) //Function for Addition
{
    attron(A_BOLD);
    attron(COLOR_PAIR(2));
    printw("Performing add functionality.\n");
    attroff(COLOR_PAIR(2));
    attroff(A_BOLD);
    refresh();
    getch();

    int c;

    printf("%s %s %s\n", name, phone, memo);
    printf("add? [Y/N]: ");

    c = getchar();
    getchar(); // Consume the newline character from previous input

    if (c == 'Y')
    {
        strcpy(information->list[information->count].name, name);
        strcpy(information->list[information->count].phone, phone);
        strcpy(information->list[information->count].memo, memo);

        information->count++;
    }
    else
    {
        printf("add function canceled.\n");
    }
}

void deleteFunction(Info* information, char* name)   //Function for deletion
{
    attron(A_BOLD);
    attron(COLOR_PAIR(3));
    printw("Performing delete functionality.\n");
    attroff(COLOR_PAIR(3));
    attroff(A_BOLD);
    refresh();
    getch();

    int match = 0;  //Show the order of the data, Role to indicate the presence or absence of a match
    int i = 0;
    for (; i < information->count; i++)
    {
        if (strstr(information->list[i].name, name) != NULL || strstr(information->list[i].phone, name) != NULL || strstr(information->list[i].memo, name) != NULL)
        {
            printf("%d %s %s %s\n", match + 1, information->list[i].name, information->list[i].phone, information->list[i].memo);   //Print matching data
            match++;
        }
    }
    if (match == 0)
    {
        printf("no match found.\n");
        return;
    }

    int index;
    printf("which one? ");
    scanf("%d", &index);
    getchar(); // Consume the newline character from previous input

    if (index < 1 || index > match)
    {
        printf("invalid index.\n");
        return;
    }

    int deletionCount = 0;
    for (i = 0; i < information->count; i++)
    {
        if (strstr(information->list[i].name, name) != NULL || strstr(information->list[i].phone, name) != NULL || strstr(information->list[i].memo, name) != NULL)
        {
            deletionCount++;
        }
        if (deletionCount == index)
        {
            break;
        }
    }

    for (int j = i; j < information->count - 1; j++)
    {
        strcpy(information->list[j].name, information->list[j + 1].name);
        strcpy(information->list[j].phone, information->list[j + 1].phone);
        strcpy(information->list[j].memo, information->list[j + 1].memo);
    }

    information->count--;
}

void listFunction(Info* information) //Function for displaying list
{
    attron(A_BOLD);
    attron(COLOR_PAIR(4));
    printw("Performing list functionality.\n");
    attroff(COLOR_PAIR(4));
    attroff(A_BOLD);
    refresh();
    getch();

    for (int i = 0; i < information->count; i++)
    {
        for (int j = i + 1; j < information->count; j++)
        {
            if (strcmp(information->list[i].name, information->list[j].name) > 0)
            {
                Address temp = information->list[i];
                information->list[i] = information->list[j];
                information->list[j] = temp;
            }
        }
    }

    for (int k = 0; k < information->count; k++)
    {
        printf("%d %s %s %s\n", k + 1, information->list[k].name, information->list[k].phone, information->list[k].memo);
    }
}

void saveFunction(Info* information) //Function for saving
{
    FILE* file = fopen("data.txt", "w");
    if (file == NULL)
    {
        printf("failed to open the file for writing.\n");
        return;
    }

    for (int i = 0; i < information->count; i++)
    {
        fprintf(file, "%s:%s:%s\n", information->list[i].name, information->list[i].phone, information->list[i].memo);
    }

    fclose(file);
}

void loadFunction(Info* information) //Function for loading
{
    FILE* file = fopen("data.txt", "r");
    if (file == NULL)
    {
        printf("failed to open the file for reading.\n");
        return;
    }

    char line[100];
    char name[30];
    char phone[20];
    char memo[40];

    while (fgets(line, sizeof(line), file) != NULL)
    {
        sscanf(line, "%29[^:]:%19[^:]:%39[^\n]", name, phone, memo);
        if (information->count < MAX)
        {
            strcpy(information->list[information->count].name, name);
            strcpy(information->list[information->count].phone, phone);
            strcpy(information->list[information->count].memo, memo);
            information->count++;
        }
        else
        {
            printf("the maximum limit has been reached. cannot load more information.\n");
            break;
        }
    }
    fclose(file);
}

void printMenu() {
    clear();
    printw("Phone Number Management Program\n");
    printw("--------------------\n");
    printw("1. Search Phone Number\n");
    printw("2. Add Phone Number\n");
    printw("3. Delete Phone Number\n");
    printw("4. List Phone Numbers\n");
    printw("--------------------\n");
    printw("0. Exit\n");
    printw("\n");
    printw("Enter your choice: ");
    refresh();
}

void selectMenuItem(int choice) {
    switch (choice) {
    case 1:
        searchPhoneNumber();
        break;
    case 2:
        addPhoneNumber();
        break;
    case 3:
        deletePhoneNumber();
        break;
    case 4:
        listPhoneNumbers();
        break;
    default:
        break;
    }
}

int main() {
    initscr();
    cbreak();
    noecho();
    keypad(stdscr, TRUE);
    start_color();
    init_pair(1, COLOR_CYAN, COLOR_BLACK);
    init_pair(2, COLOR_MAGENTA, COLOR_BLACK);
    init_pair(3, COLOR_YELLOW, COLOR_BLACK);
    init_pair(4, COLOR_GREEN, COLOR_BLACK);

    int choice;

    while (1) {
        printMenu();
        choice = getch() - '0';

        if (choice == 0)
            break;

        selectMenuItem(choice);
    }

    endwin();

    return 0;
}
