#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ncurses.h>

#define MAX 100

typedef struct {
    char name[30];
    char phone[20];
    char memo[40];
} Address;

typedef struct {
    Address list[MAX];
    int count;
} Info;

void searchFunction(Info* information, char* query) {
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

void addFunction(Info* information, char* name, char* phone, char* memo) {
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

void deleteFunction(Info* information, char* name) {
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

void listFunction(Info* information) {
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

void saveFunction(Info* information) {
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

void loadFunction(Info* information) {
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

void printMenu(WINDOW* menuWin, int highlight) {
    char* menuOptions[] = {
        "Search",
        "Add",
        "Delete",
        "List",
        "Save",
        "Load",
        "Exit"
    };
    int numOptions = sizeof(menuOptions) / sizeof(menuOptions[0]);

    box(menuWin, 0, 0);
    for (int i = 0; i < numOptions; i++) {
        if (highlight == i + 1) {
            wattron(menuWin, A_REVERSE | A_BOLD);
        }
        mvwprintw(menuWin, i + 1, 1, menuOptions[i]);
        wattroff(menuWin, A_REVERSE | A_BOLD);
    }
    wrefresh(menuWin);
}

int main() {

    WINDOW* menuWin;
    int highlight = 1;
    int choice;
    int c;

    initscr();  // Initialize the screen
    start_color();  // Enable color functionality
    init_pair(1, COLOR_WHITE, COLOR_BLUE);  // Define color pair 1 (white text on blue background)
    init_pair(2, COLOR_CYAN, COLOR_BLACK);  // Define color pair 2 (cyan text on black background)
    cbreak();   // Line buffering disabled
    noecho();   // Don't echo user input
    keypad(stdscr, TRUE);   // Enable function keys and arrow keys
    refresh();

    menuWin = newwin(9, 20, 1, 1);  // Create a new window for the menu
    wbkgd(menuWin, COLOR_PAIR(1));  // Set background color for the menu window
    refresh();
    printMenu(menuWin, highlight);  // Print the menu

    while (1) {
        choice = getch();
        switch (choice) {
        case KEY_UP:
            if (highlight == 1)
                highlight = 7;
            else
                highlight--;
            break;
        case KEY_DOWN:
            if (highlight == 7)
                highlight = 1;
            else
                highlight++;
            break;
        case 10:  // Enter key
            if (highlight == 7) {
                endwin();  // Clean up and exit
                return 0;
            }
            else {
                // Perform the selected action based on highlight value
                switch (highlight) {
                case 1:
                    // Search
                    searchFunction()
                    break;
                case 2:
                    // Add
                    addFunction()
                    break;
                case 3:
                    // Delete
                    deleteFunction()
                    break;
                case 4:
                    // List
                    listFunction()
                    break;
                case 5:
                    // Save
                    saveFunction()
                    break;
                case 6:
                    // Load
                    loadFunction()
                    break;
                }
            }
            break;
        }
        printMenu(menuWin, highlight);  // Update the menu display
    }

    endwin();  // Clean up and exit
    return 0;
}
