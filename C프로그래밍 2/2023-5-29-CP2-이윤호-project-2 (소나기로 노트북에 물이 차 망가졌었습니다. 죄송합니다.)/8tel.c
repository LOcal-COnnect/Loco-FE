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

void searchFunction(Info* information, char* query)   //Function for search
{
    clear();
    refresh();

    mvprintw(1, 1, "Search Information");
    mvprintw(3, 1, "Enter query");

    refresh();

    echo();
    curs_set(1);

    char query[30];

    mvscanw(3, 14, "%29s", query);

    noecho();
    curs_set(0);

    int match = 0;  //Show the order of the data, Role to indicate the presence or absence of a match

    for (int i = 0; i < information->count; i++)     // Compare content and query
    {
        if (strstr(information->list[i].name, query) != NULL || strstr(information->list[i].phone, query) != NULL || strstr(information->list[i].memo, query) != NULL)
        {
            mvprintw(match + 6, 1, "%d %s %s %s", match + 1, information->list[i].name, information->list[i].phone, information->list[i].memo);  //Print matching data
            match++;
        }
    }

    if (match != 0) 
    {
        mvprintw(match + 7, 1, "Match found.");
    }
    else 
    {
        mvprintw(match + 7, 1, "No match found.");
    }

    refresh();
    getch();
}

void addFunction(Info* information, char* name, char* phone, char* memo) //Function for Addition
    {
    clear(); //clear screen
    refresh();

    mvprintw(1, 1, "Add Information");
    mvprintw(3, 1, "Enter name: ");
    mvprintw(4, 1, "Enter phone number: ");
    mvprintw(5, 1, "Enter memo: ");

    refresh();

    echo();
    curs_set(1);

    char name[30];
    char phone[20];
    char memo[40];

    mvscanw(3, 14, "%29s", name);
    mvscanw(4, 22, "%19s", phone);
    mvscanw(5, 14, "%39s", memo);

    noecho();
    curs_set(0);

    int c;

    mvprintw(7, 1, "Name: %s", name);
    mvprintw(8, 1, "Phone: %s", phone);
    mvprintw(9, 1, "Memo: %s", memo);

    mvprintw(11, 1, "add?[Y/N]: ");

    refresh();

    c = getch();

    if (c == 'Y' || c == 'y')    // Add information
    {
        strcpy(information->list[information->count].name, name);
        strcpy(information->list[information->count].phone, phone);
        strcpy(information->list[information->count].memo, memo);
        information->count++;
        mvprintw(13, 1, "Information added success");
    }
    else {
        mvprintw(13, 1, "Add operation is canceled.");
    }

    refresh();
    getch();
}

void deleteFunction(Info* information, char* name)   //Function for deletion
    {
    clear();
    refresh();

    mvprintw(1, 1, "Delete Information");
    mvprintw(3, 1, "Enter name or query: ");

    refresh();

    echo();
    curs_set(1);

    char query[30];

    mvscanw(3, 22, "%29s", query);

    noecho();
    curs_set(0);

    int match = 0;    //Show the order of the data, Role to indicate the presence or absence of a match

    int deletionCount = 0;
    int index = 0;


    for (int i = 0; i < information->count; i++) 
    {
        if (strstr(information->list[i].name, query) != NULL || strstr(information->list[i].phone, query) != NULL || strstr(information->list[i].memo, query) != NULL)
        {
            mvprintw(match + 5, 1, "%d %s %s %s", match + 1, information->list[i].name, information->list[i].phone, information->list[i].memo); //Print matching data
            match++;
        }
    }

    if (match == 0) {
        mvprintw(match + 5, 1, "No match found.");
        refresh();
        getch();
        return;
    }

    mvprintw(match + 6, 1, "Which one? ");
    refresh();

    echo();
    curs_set(1);

    scanw("%d", &index);

    noecho();
    curs_set(0);

    if (index < 1 || index > match) 
    {
        mvprintw(match + 8, 1, "Invalid index.");
        refresh();
        getch();
        return;
    }

    for (int i = 0; i < information->count; i++)
    {
        if (strstr(information->list[i].name, query) != NULL || strstr(information->list[i].phone, query) != NULL || strstr(information->list[i].memo, query) != NULL)
        {
            deletionCount++;
        }
        if (deletionCount == index)
        {
            for (int j = i; j < information->count - 1; j++)     // Delete information
            {
                strcpy(information->list[j].name, information->list[j + 1].name);
                strcpy(information->list[j].phone, information->list[j + 1].phone);
                strcpy(information->list[j].memo, information->list[j + 1].memo);
            }
            information->count--;
            break;
        }
    }

    mvprintw(match + 8, 1, "Information deleted success");
    refresh();
    getch();
}

void listFunction(Info* information)     //Function for displaying list
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

    for (int k = 0; k < information->count; k++) {
        mvprintw(k + 3, 1, "%d %s %s %s", k + 1, information->list[k].name, information->list[k].phone, information->list[k].memo);
    }

    mvprintw(information->count + 4, 1, "Press any key to continue");
    refresh();
    getch();
}

void saveFunction(Info* information)     //Function for saving
{
    FILE* file = fopen("data.txt", "w");
    if (file == NULL) {
        clear();
        refresh();
        mvprintw(1, 1, "Failed to open the file for writing.\n");

        refresh();
        getch();

        return;
    }

    for (int i = 0; i < information->count; i++)    //Save infomation
    {
        fprintf(file, "%s:%s:%s\n", information->list[i].name, information->list[i].phone, information->list[i].memo);
    }

    fclose(file);
}

void loadFunction(Info* information)     //Function for loading
{
    FILE* file = fopen("data.txt", "r");

    if (file == NULL)
    {
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
        else {
            clear();
            refresh();
            mvprintw(1, 1, "The maximum limit has been reached. Cannot load more information.");
            refresh();
            getch();
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

int main(int argc, char* argv[]) {

    WINDOW* menuWin;
    int highlight = 1;
    int choice;
    int c;

    Info information;
    information.count = 0;

    loadFunction(&information); //data.txt

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
                highlight = 5;
            else
                highlight--;
            break;
        case KEY_DOWN:
            if (highlight == 5)
                highlight = 1;
            else
                highlight++;
            break;
        case 10:
            clear();
            refresh();
            switch (highlight) { //select menu
            case 1:
                addFunction(&information);
                saveFunction(&information);
                break;
            case 2:
                searchFunction(&information);
                break;
            case 3:
                deleteFunction(&information);
                saveFunction(&information);
                break;
            case 4:
                listFunction(&information);
                break;
            case 5:
            {
                FILE* file = fopen("data.txt", "w");
                if (file != NULL) {
                    fclose(file);
                }
                endwin();
                return 0;
            }
            default:
                break;
            }
        default:
            break;
        }
    }
}
