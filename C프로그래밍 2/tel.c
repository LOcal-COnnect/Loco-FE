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

void searchFunction(Info* information, char* query)  //Function for search
{
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

int main() {
    // NCURSES reset
    initscr();
    cbreak();
    noecho();
    keypad(stdscr, TRUE);

    // Creating a Menu Window
    WINDOW* menuwin = newwin(10, 30, 2, 2);
    box(menuwin, 0, 0); Creating a Menu Window
    refresh();
    wrefresh(menuwin);

    // Arrange menu items
    char* choices[] = {
        "1. search",
        "2. add",
        "3. delete",
        "4. list",
        "5. exit",
    };

    // Number of menu items
    int n_choices = sizeof(choices) / sizeof(char*);

    // Print menu
    printw(-------------------------------------)
    for (int i = 0; i < n_choices; i++) {
        mvwprintw(menuwin, i + 1, 1, choices[i]);
    }
    printw(-------------------------------------)

    // Currently selected menu item index
    int choice = 0;

    // Show selected menu item highlights
    mvwchgat(menuwin, 1, 1, 28, A_REVERSE, 0, NULL);
    wrefresh(menuwin);

    // Menu Control loop
    while (1) {
        int c = wgetch(menuwin);
        switch (c) {
        case KEY_UP:
            // Press the KEY_UP to select a previous menu item
            mvwchgat(menuwin, choice + 1, 1, 28, A_NORMAL, 0, NULL);
            choice = (choice - 1 + n_choices) % n_choices;
            mvwchgat(menuwin, choice + 1, 1, 28, A_REVERSE, 0, NULL);
            wrefresh(menuwin);
            break;
        case KEY_DOWN:
            // Press the KEY_DOWN to select the next menu item
            mvwchgat(menuwin, choice + 1, 1, 28, A_NORMAL, 0, NULL);
            choice = (choice + 1) % n_choices;
            mvwchgat(menuwin, choice + 1, 1, 28, A_REVERSE, 0, NULL);
            wrefresh(menuwin);
            break;
        case 10: // Press Enter to launch the selected menu item
            clear();
            switch (choice) {
            case 0:
                searchFunction;
                break;
            case 1:
                addFunction;
                break;
            case 2:
                deleteFunction;
                break;
            case 3:
                listFunction;
                break;
            case 4:
                endwin();
                return 0;
            }
            clear();
            box(menuwin, 0, 0);
            for (int i = 0; i < n_choices; i++) {
                mvwprintw(menuwin, i + 1, 1, choices[i]);
            }
            mvwchgat(menuwin, choice + 1, 1, 28, A_REVERSE, 0, NULL);
            wrefresh(menuwin);
            break;
        }
    }

    // Exit NCURSES
    endwin();

    return 0;
}

